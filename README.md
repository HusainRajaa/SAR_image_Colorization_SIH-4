---
title: SAR Image Colorization
emoji: 🛰️
colorFrom: indigo
colorTo: purple
sdk: docker
pinned: false
license: mit
short_description: Colorize SAR images using Deep Learning
---

# 🛰️ SAR Image Colorization

> **Smart India Hackathon 2024 (SIH-24) Winning Project**

A deep learning-powered web application that transforms grayscale Synthetic Aperture Radar (SAR) images into colorized RGB images, making them easier to interpret for applications like environmental monitoring, disaster management, and urban planning.

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-red.svg)
![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Model Architecture](#-model-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)

---

## 🌍 Overview

**Synthetic Aperture Radar (SAR)** is a type of radar used to create high-resolution images of landscapes from satellites or aircraft. Unlike optical sensors, SAR can capture images regardless of weather conditions or time of day. However, SAR images are inherently **grayscale**, making visual interpretation challenging.

This project uses **deep learning** to automatically colorize SAR images, adding realistic colors that help analysts quickly identify:
- 🌲 Vegetation and forests
- 🏙️ Urban areas and buildings
- 💧 Water bodies
- 🏔️ Terrain features

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **SAR Image Colorization** | Upload grayscale SAR images and get colorized RGB outputs using AI |
| **Greenery Index Calculator** | Analyze images to calculate vegetation coverage percentage |
| **AI Chatbot** | Get answers to common questions about SAR technology |
| **Modern UI** | Beautiful 3D Earth visualization with glassmorphism design |
| **Docker Support** | Easy deployment via Docker/Hugging Face Spaces |

---

## 🔬 How It Works

### 1. Image Upload & Preprocessing
```
User uploads SAR image → Convert to grayscale (L mode) → Normalize pixel values to [-1, 1]
```

### 2. Sliding Window Colorization
For high-resolution images, we use a **sliding window approach** to process the image in overlapping patches:

```python
# Sliding window parameters
patch_size = 256  # Process 256x256 patches
overlap = 32      # 32 pixel overlap between patches

# Process each patch through the Generator
for patch in image_patches:
    colorized_patch = Generator(patch)
    
# Average overlapping regions for smooth transitions
final_image = blend_patches(colorized_patches)
```

This approach:
- ✅ Handles images of any size
- ✅ Reduces memory usage
- ✅ Creates smooth transitions between patches

### 3. Post-Processing
```
Denormalize output → Convert tensor to image → Save colorized result
```

### 4. Greenery Analysis (Optional)
Uses **HSV color space** analysis to detect green vegetation:
```python
# HSV thresholds for green detection
lower_green = [30, 40, 40]   # Hue, Saturation, Value
upper_green = [90, 255, 255]

greenery_rate = (green_pixels / total_pixels) × 100
```

---

## 🧠 Model Architecture

The colorization model uses a **GAN-based architecture** with an **Encoder-Attention-Decoder** structure:

```
┌─────────────────────────────────────────────────────────────────┐
│                        GENERATOR (G1)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌──────────────────┐    ┌─────────────┐     │
│  │   ENCODER   │ -> │  SELF-ATTENTION  │ -> │   DECODER   │     │
│  │             │    │                  │    │             │     │
│  │ 1ch → 64    │    │ Query-Key-Value  │    │ 256 → 128   │     │
│  │ 64 → 128    │    │ Attention Maps   │    │ 128 → 64    │     │
│  │ 128 → 256   │    │ Learnable γ      │    │ 64 → 3ch    │     │
│  └─────────────┘    └──────────────────┘    └─────────────┘     │
│                                                                  │
│  Input: 1×256×256 (Grayscale)    Output: 3×256×256 (RGB)        │
└─────────────────────────────────────────────────────────────────┘
```

### Encoder
Downsamples the input image while extracting features:

| Layer | Input Channels | Output Channels | Kernel | Stride |
|-------|----------------|-----------------|--------|--------|
| Conv1 | 1 | 64 | 7×7 | 1 |
| Conv2 | 64 | 128 | 3×3 | 2 |
| Conv3 | 128 | 256 | 3×3 | 2 |

Each convolutional layer is followed by:
- **Instance Normalization** - Normalizes each sample independently
- **ReLU Activation** - Non-linear activation function

### Self-Attention Block
The attention mechanism helps the model focus on relevant spatial relationships:

```python
class AttentionBlock(nn.Module):
    def __init__(self, in_channels):
        # Project features to Query, Key, Value spaces
        self.query_conv = nn.Conv2d(in_channels, in_channels // 8, 1)
        self.key_conv = nn.Conv2d(in_channels, in_channels // 8, 1)
        self.value_conv = nn.Conv2d(in_channels, in_channels, 1)
        self.gamma = nn.Parameter(torch.zeros(1))  # Learnable scale

    def forward(self, x):
        # Compute attention: softmax(Q × K^T) × V
        attention = softmax(query @ key.T)
        out = value @ attention
        return gamma * out + x  # Residual connection
```

**Why Self-Attention?**
- Captures **long-range dependencies** in the image
- Helps colorize based on **context** (e.g., water near vegetation should have appropriate colors)
- The learnable `gamma` parameter starts at 0 and gradually increases during training

### Decoder
Upsamples features back to image resolution:

| Layer | Input Channels | Output Channels | Kernel | Stride |
|-------|----------------|-----------------|--------|--------|
| TransConv1 | 256 | 128 | 3×3 | 2 |
| TransConv2 | 128 | 64 | 3×3 | 2 |
| Conv3 | 64 | 3 | 7×7 | 1 |

- **Transposed Convolutions** - Upsample the feature maps
- **Tanh Activation** (final layer) - Outputs values in [-1, 1] range

---

## 🛠️ Tech Stack

### Machine Learning
| Technology | Purpose |
|------------|---------|
| **PyTorch** | Deep learning framework for model inference |
| **torchvision** | Image transformations and utilities |
| **OpenCV** | Image processing (HSV analysis) |
| **NumPy** | Numerical computations |
| **Pillow** | Image loading and saving |

### Web Framework
| Technology | Purpose |
|------------|---------|
| **Flask** | Backend web server |
| **Jinja2** | HTML templating |
| **Three.js** | 3D Earth visualization on frontend |
| **Gunicorn** | Production WSGI server |

### Deployment
| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Hugging Face Spaces** | Cloud deployment |

---

## 🚀 Installation

### Prerequisites
- Python 3.9 or higher
- pip package manager

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/HusainRajaa/SAR_image_Colorization_SIH-4.git
   cd SAR_image_Colorization_SIH-4
   ```

2. **Create a virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open in browser**
   ```
   http://127.0.0.1:5000
   ```

### Docker Setup

```bash
docker build -t sar-colorization .
docker run -p 7860:7860 sar-colorization
```

---

## 📖 Usage

### SAR Image Colorization
1. Open the web application
2. Drag & drop or select a grayscale SAR image
3. Click **Upload** to process
4. View the colorized result

### Greenery Index
1. Navigate to **Greenery Index** page
2. Upload an image (colorized or natural)
3. Get the percentage of green vegetation

### AI Chatbot
1. Navigate to **AI Chatbot** page
2. Ask questions about SAR technology
3. Get instant answers from the FAQ database

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Home page with upload form |
| `/upload` | POST | Upload SAR image for colorization |
| `/greenery` | GET | Greenery analysis page |
| `/greenery-upload` | POST | Upload image for greenery calculation |
| `/chatbot` | GET | AI chatbot interface |
| `/chatbot/ask` | POST | Send question to chatbot |

---

## 📁 Project Structure

```
SAR-Image-Colorization/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── Dockerfile             # Docker configuration
├── README.md              # This file
│
├── weights/
│   └── best_G1.pth        # Pre-trained Generator model (~3.3 MB)
│
├── templates/
│   ├── index.html         # Home page with 3D Earth
│   ├── result.html        # Colorization results
│   ├── greenery.html      # Greenery analysis page
│   └── chatbot.html       # AI chatbot interface
│
└── static/
    ├── style.css          # Stylesheet
    ├── script.js          # JavaScript
    ├── uploads/           # Uploaded images
    └── *.png              # Static assets
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Smart India Hackathon 2024** for the platform
- **PyTorch Team** for the deep learning framework
- **Three.js** for the stunning 3D Earth visualization

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/HusainRajaa">Husain Raja</a>
</p>
