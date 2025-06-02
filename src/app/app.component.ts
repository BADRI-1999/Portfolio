// app.component.ts
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[MatToolbarModule,MatExpansionModule,MatCardModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Syam Badri Portfolio'; // You can use this for the document title or other purposes

  // Function to sanitize string for use in ID
  sanitizeId(text: string): string {
    return text.replace(/[^a-zA-Z0-9-]/g, '-');
  }

  // Function to call Gemini API for project insights
  async generateProjectInsight(projectName: string, projectDescription: string, buttonElement: EventTarget | null): Promise<void> {
    const outputDivId = `project-output-${this.sanitizeId(projectName)}`;
    const loadingDivId = `project-loading-${this.sanitizeId(projectName)}`;
    const outputDiv = document.getElementById(outputDivId);
    const loadingDiv = document.getElementById(loadingDivId);
    const btn = buttonElement as HTMLButtonElement; // Cast to HTMLButtonElement

    if (!outputDiv || !loadingDiv || !btn) {
      console.error('Required DOM elements not found for project insight.');
      return;
    }

    // Disable button and show loading indicator
    btn.disabled = true;
    outputDiv.classList.add('hidden');
    loadingDiv.classList.remove('hidden');
    outputDiv.textContent = ''; // Clear previous content

    try {
      let chatHistory = [];
      const prompt = `As an AI expert, provide a detailed technical insight into the project "${projectName}". The project description is: "${projectDescription}". Focus on potential technical challenges, the solutions that might have been implemented, and the broader impact of such a project in the field of AI/ML or data engineering. Keep it concise, around 100-150 words.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = "AIzaSyDIHBCkLWxO-7qmenx1UjVGFXYx3TgJG_0"; // Leave as empty string, Canvas will provide it
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        outputDiv.textContent = text;
        outputDiv.classList.remove('hidden');
      } else {
        outputDiv.textContent = 'Failed to generate insight. Please try again.';
        outputDiv.classList.remove('hidden');
        console.error('Gemini API response structure unexpected:', result);
      }
    } catch (error: any) { // Use 'any' for error type or a more specific type if known
      outputDiv.textContent = `Error: ${error.message}. Please try again.`;
      outputDiv.classList.remove('hidden');
      console.error('Error calling Gemini API:', error);
    } finally {
      // Re-enable button and hide loading indicator
      btn.disabled = false;
      loadingDiv.classList.add('hidden');
    }
  }

  // Function to call Gemini API for skill deep dive
  async explainSkill(skillName: string, buttonElement: EventTarget | null): Promise<void> {
    const outputDivId = `skill-output-${this.sanitizeId(skillName)}`;
    const loadingDivId = `skill-loading-${this.sanitizeId(skillName)}`;
    const outputDiv = document.getElementById(outputDivId);
    const loadingDiv = document.getElementById(loadingDivId);
    const btn = buttonElement as HTMLButtonElement; // Cast to HTMLButtonElement

    if (!outputDiv || !loadingDiv || !btn) {
      console.error('Required DOM elements not found for skill deep dive.');
      return;
    }

    // Disable button and show loading indicator
    btn.disabled = true;
    outputDiv.classList.add('hidden');
    loadingDiv.classList.remove('hidden');
    outputDiv.textContent = ''; // Clear previous content

    try {
      let chatHistory = [];
      const prompt = `Explain the importance and common applications of the skill "${skillName}" in the context of a Data Engineer and Software Engineer specializing in AI/ML. Provide a concise explanation, around 80-120 words.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = "AIzaSyDIHBCkLWxO-7qmenx1UjVGFXYx3TgJG_0"; // Leave as empty string, Canvas will provide it
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        outputDiv.textContent = text;
        outputDiv.classList.remove('hidden');
      } else {
        outputDiv.textContent = 'Failed to generate explanation. Please try again.';
        outputDiv.classList.remove('hidden');
        console.error('Gemini API response structure unexpected:', result);
      }
    } catch (error: any) { // Use 'any' for error type or a more specific type if known
      outputDiv.textContent = `Error: ${error.message}. Please try again.`;
      outputDiv.classList.remove('hidden');
      console.error('Error calling Gemini API:', error);
    } finally {
      // Re-enable button and hide loading indicator
      btn.disabled = false;
      loadingDiv.classList.add('hidden');
    }
  }
}
