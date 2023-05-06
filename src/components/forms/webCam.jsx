import React, { useState, useRef } from "react";
import { getRecommendedCompostsBySoilType } from "../../services/compostService";
import { useNavigate } from "react-router-dom";
import { populateRecommendedComposts } from "../../store/composts";
import { useDispatch } from "react-redux";

function WebCam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photoSrc, setPhotoSrc] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error(error);
    }
  };

  startCamera();

  const takePhoto = async () => {
    try {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoData = canvas.toDataURL("image/jpeg", 0.8);
      setPhotoSrc(photoData);

      const formData = new FormData();
      const blob = await fetch(photoData).then((r) => r.blob());
      formData.append("image", blob);

      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      const recommendedComposts = await getRecommendedCompostsBySoilType(data).then((res)=>{dispatch(populateRecommendedComposts(res))})

      console.log("recommendedComposts: ", recommendedComposts);
      navigate("/RecommendedComposts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{ width: "100%", height: "auto" }}
        />
        <div className="d-flex justify-content-around align-items-center">
          <button
            onClick={takePhoto}
            style={{
              bottom: "20px",
              backgroundColor: "#DEF9EC",
              color: "#3BB77E",
              padding: "10px 20px",
              borderColor: "#3BB77E",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              marginLeft: "20px",
            }}
          >
            Take Photo
          </button>
        </div>
      </div>
    </div>
  );
}

export default WebCam;
