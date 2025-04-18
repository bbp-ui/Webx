// Interface for feedback data
interface FeedbackData {
    event: string;
    name: string;
    feedback: string;
  }
  
  // Class to handle feedback functionality
  class FeedbackManager {
    private form: HTMLFormElement | null;
    
    constructor(formId: string) {
      this.form = document.getElementById(formId) as HTMLFormElement;
      this.initializeListeners();
    }
    
    // Initialize event listeners
    private initializeListeners(): void {
      if (!this.form) return;
      
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitFeedback();
      });
    }
    
    // Submit feedback data
    private submitFeedback(): void {
      if (!this.form) return;
      
      const eventSelect = this.form.querySelector('#event') as HTMLSelectElement;
      const nameInput = this.form.querySelector('#name') as HTMLInputElement;
      const feedbackInput = this.form.querySelector('#feedback') as HTMLTextAreaElement;
      
      const feedbackData: FeedbackData = {
        event: eventSelect.value,
        name: nameInput.value,
        feedback: feedbackInput.value
      };
      
      // Validate input
      if (!feedbackData.event || !feedbackData.name || !feedbackData.feedback) {
        alert('Please fill in all fields');
        return;
      }
      
      // Submit the form
      this.form.submit();
    }
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    const feedbackManager = new FeedbackManager('feedback-form');
  });