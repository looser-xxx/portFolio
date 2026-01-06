import os
import subprocess
import json

VIDEO_DIR = "videos/agenAnim"
THUMB_DIR = "images/brandWorks"
EXTENSIONS = ('.mp4', '.mov', '.webm', '.mkv')

def get_duration(file_path):
    cmd = [
        "ffprobe", 
        "-v", "error", 
        "-show_entries", "format=duration", 
        "-of", "default=noprint_wrappers=1:nokey=1", 
        file_path
    ]
    try:
        output = subprocess.check_output(cmd).decode().strip()
        return float(output)
    except Exception as e:
        print(f"Error getting duration for {file_path}: {e}")
        return 0

def generate_thumbnail(video_path, thumb_path, time_offset):
    cmd = [
        "ffmpeg",
        "-y", # Overwrite
        "-ss", str(time_offset),
        "-i", video_path,
        "-vframes", "1",
        "-q:v", "50", # Quality
        thumb_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def main():
    if not os.path.exists(THUMB_DIR):
        os.makedirs(THUMB_DIR)

    video_files = [f for f in os.listdir(VIDEO_DIR) if f.lower().endswith(EXTENSIONS)]
    video_files.sort()
    
    results = []

    for video_file in video_files:
        video_path = os.path.join(VIDEO_DIR, video_file)
        # Create a safe filename for the thumbnail
        base_name = os.path.splitext(video_file)[0]
        # remove spaces and special chars for web safety if needed, but keeping simple for now
        thumb_name = base_name.replace(" ", "_").replace("[", "").replace("]", "") + ".webp"
        thumb_path = os.path.join(THUMB_DIR, thumb_name)
        
        duration = get_duration(video_path)
        midpoint = duration / 2.0
        
        # Extract thumbnail
        generate_thumbnail(video_path, thumb_path, midpoint)
        
        results.append({
            "video_path": video_path,
            "thumb_path": thumb_path,
            "title": base_name
        })
        print(f"Processed: {video_file} -> {thumb_path} (Duration: {duration}s, Midpoint: {midpoint}s)")

    # Save results to a json file for easy reading
    with open("brand_works_data.json", "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    main()
