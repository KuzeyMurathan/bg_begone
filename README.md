no bs image background removing done right , locally, for free

## How to Use

### Prerequisites
- Node.js (version 18 or higher)
- npm or pnpm package manager

### Installation
1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

### Running the App
1. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
2. Open your browser and navigate to `http://localhost:3000`

### Using the Background Remover
1. **Upload an Image**: Click on the "DROP_IMAGE" area or drag and drop an image file
2. **Process the Image**: Click the "EXECUTE" button to remove the background
   - The app uses a simple algorithm that removes pixels matching the background color (based on the top-left corner pixel)
   - Processing happens entirely in your browser for privacy
3. **Download Result**: Once processing is complete, click the download button to save the image with transparent background
4. **Reset**: Use the X button to clear and start over

### Notes
- Works best with images that have a solid, uniform background color
- Processing is done client-side only - your images never leave your device
- No API keys or subscriptions required