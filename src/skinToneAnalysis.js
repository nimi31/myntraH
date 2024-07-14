export const analyzeSkinTone = (imageSrc) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "Anonymous"; // Ensure the image can be used in a canvas

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let r = 0, g = 0, b = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      r = Math.floor(r / (data.length / 4));
      g = Math.floor(g / (data.length / 4));
      b = Math.floor(b / (data.length / 4));

      console.log(`Average Color: R=${r}, G=${g}, B=${b}`);

      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      console.log(`Brightness: ${brightness}`);

      if (brightness > 127) {
        resolve("light");
      } else {
        resolve("dark");
      }
    };

    image.onerror = () => {
      console.error("Error loading image");
      resolve("unknown");
    };
  });
};

export const getRecommendations = (skinTone) => {
  if (skinTone === "light") {
    return ["Light Shade Dress", "Cream Color Top"];
  } else if (skinTone === "dark") {
    return ["Dark Shade Jacket", "Black Shirt"];
  }
  return ["No recommendations available"];
};
