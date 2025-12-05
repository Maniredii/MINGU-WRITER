"""
Test suite for the Paraphrase API backend.

Run with: pytest test_api.py
"""

import pytest
import requests
import time
from typing import Dict, Any

BASE_URL = "http://localhost:8000"


class TestHealthEndpoint:
    """Tests for the health check endpoint."""
    
    def test_health_check(self):
        """Test that health endpoint returns 200 and correct status."""
        response = requests.get(f"{BASE_URL}/health")
        assert response.status_code == 200
        
        data = response.json()
        assert "status" in data
        assert data["status"] == "healthy"
        assert "model_loaded" in data
        assert data["model_loaded"] is True


class TestRootEndpoint:
    """Tests for the root endpoint."""
    
    def test_root_endpoint(self):
        """Test that root endpoint returns API information."""
        response = requests.get(f"{BASE_URL}/")
        assert response.status_code == 200
        
        data = response.json()
        assert "status" in data
        assert data["status"] == "online"
        assert "model" in data
        assert "endpoints" in data


class TestParaphraseEndpoint:
    """Tests for the paraphrase endpoint."""
    
    def test_basic_paraphrase(self):
        """Test basic paraphrasing functionality."""
        payload = {
            "text": "The quick brown fox jumps over the lazy dog.",
            "strength": 50
        }
        
        response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert "paraphrase" in data
        assert "original_text" in data
        assert "strength" in data
        assert data["original_text"] == payload["text"]
        assert data["strength"] == payload["strength"]
        assert len(data["paraphrase"]) > 0
    
    def test_paraphrase_different_strengths(self):
        """Test paraphrasing with different strength values."""
        text = "Artificial intelligence is transforming the world."
        strengths = [20, 50, 80]
        
        for strength in strengths:
            payload = {"text": text, "strength": strength}
            response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
            
            assert response.status_code == 200
            data = response.json()
            assert data["strength"] == strength
            assert len(data["paraphrase"]) > 0
    
    def test_paraphrase_default_strength(self):
        """Test paraphrasing with default strength (no strength specified)."""
        payload = {"text": "This is a test sentence."}
        
        response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["strength"] == 50  # Default value
    
    def test_paraphrase_empty_text(self):
        """Test that empty text returns 400 error."""
        payload = {"text": "", "strength": 50}
        
        response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
        assert response.status_code == 400
    
    def test_paraphrase_whitespace_only(self):
        """Test that whitespace-only text returns 400 error."""
        payload = {"text": "   ", "strength": 50}
        
        response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
        assert response.status_code == 400
    
    def test_paraphrase_invalid_strength_high(self):
        """Test that strength > 100 returns validation error."""
        payload = {"text": "Test sentence.", "strength": 150}
        
        response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
        assert response.status_code == 422  # Validation error
    
    def test_paraphrase_invalid_strength_low(self):
        """Test that strength < 0 returns validation error."""
        payload = {"text": "Test sentence.", "strength": -10}
        
        response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
        assert response.status_code == 422  # Validation error
    
    def test_paraphrase_missing_text(self):
        """Test that missing text field returns validation error."""
        payload = {"strength": 50}
        
        response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
        assert response.status_code == 422  # Validation error
    
    def test_paraphrase_long_text(self):
        """Test paraphrasing with longer text."""
        text = " ".join(["This is sentence number {}.".format(i) for i in range(10)])
        payload = {"text": text, "strength": 50}
        
        response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert len(data["paraphrase"]) > 0


class TestPerformance:
    """Performance tests for the API."""
    
    def test_response_time(self):
        """Test that paraphrase response time is reasonable."""
        payload = {"text": "This is a test sentence.", "strength": 50}
        
        start_time = time.time()
        response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
        end_time = time.time()
        
        assert response.status_code == 200
        
        response_time = end_time - start_time
        # First request may be slower due to model warmup
        # Subsequent requests should be faster
        assert response_time < 30  # Should complete within 30 seconds
    
    def test_consecutive_requests(self):
        """Test multiple consecutive requests."""
        payload = {"text": "Test sentence.", "strength": 50}
        
        for _ in range(3):
            response = requests.post(f"{BASE_URL}/paraphrase", json=payload)
            assert response.status_code == 200


class TestErrorHandling:
    """Tests for error handling."""
    
    def test_invalid_json(self):
        """Test that invalid JSON returns appropriate error."""
        response = requests.post(
            f"{BASE_URL}/paraphrase",
            data="invalid json",
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 422
    
    def test_wrong_content_type(self):
        """Test request with wrong content type."""
        response = requests.post(
            f"{BASE_URL}/paraphrase",
            data="text=test",
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        assert response.status_code == 422


# Fixtures and setup
@pytest.fixture(scope="session", autouse=True)
def check_server_running():
    """Check that the server is running before tests."""
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code != 200:
            pytest.exit("Server is not healthy. Please start the backend server.")
    except requests.exceptions.ConnectionError:
        pytest.exit("Cannot connect to server. Please start the backend server at http://localhost:8000")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
