import numpy as np
from PIL import Image
from sklearn.cluster import KMeans


def quantize_colors_kmeans(image, n_colors):
    """
    이미지 색상을 K-Means로 압축
    """

    img = image.convert("RGB")

    img_np = np.array(img)

    h, w, c = img_np.shape

    pixels = img_np.reshape(-1, 3)

    kmeans = KMeans(
        n_clusters=n_colors,
        random_state=42,
        n_init=10
    )

    kmeans.fit(pixels)

    centers = kmeans.cluster_centers_.astype(int)

    labels = kmeans.labels_

    quantized_pixels = centers[labels]

    quantized_img = quantized_pixels.reshape(h, w, 3)

    return Image.fromarray(
        quantized_img.astype("uint8")
    )