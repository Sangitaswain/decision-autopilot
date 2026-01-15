"""
Gemini AI Service
Shared client wrapper for interacting with Google's Gemini API
"""
import os
import json
import google.generativeai as genai
from typing import Any, Dict


class GeminiService:
    """Wrapper for Gemini API interactions"""
    
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is not set")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")
    
    def generate_json(
        self,
        system_instruction: str,
        user_prompt: str,
        temperature: float = 0.2
    ) -> Dict[str, Any]:
        """
        Generate a JSON response from Gemini
        
        Args:
            system_instruction: The agent's system prompt/instruction
            user_prompt: The user's input prompt
            temperature: Controls randomness (0.0-1.0)
            
        Returns:
            Parsed JSON response as a dictionary
        """
        # Create the chat with system instruction
        chat = self.model.start_chat(history=[])
        
        # Combine system instruction with user prompt
        full_prompt = f"{system_instruction}\n\n{user_prompt}"
        
        # Generate response with JSON mode
        response = chat.send_message(
            full_prompt,
            generation_config=genai.GenerationConfig(
                temperature=temperature,
                response_mime_type="application/json"
            )
        )
        
        # Parse and return JSON
        return self._clean_and_parse_json(response.text)
    
    def _clean_and_parse_json(self, text: str) -> Dict[str, Any]:
        """Clean and parse JSON from response text"""
        cleaned = text.strip()
        
        # Remove markdown code blocks if present
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        elif cleaned.startswith("```"):
            cleaned = cleaned[3:]
        
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        
        cleaned = cleaned.strip()
        
        return json.loads(cleaned)


# Singleton instance
_gemini_service = None


def get_gemini_service() -> GeminiService:
    """Get or create the Gemini service singleton"""
    global _gemini_service
    if _gemini_service is None:
        _gemini_service = GeminiService()
    return _gemini_service
