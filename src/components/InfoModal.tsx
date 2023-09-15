import React from "react";
import {useCallback, useState, useEffect} from "react";
import {AiOutlineClose} from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavouriteButton from "./FavouriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({visible, onClose}) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const {movieId} = useInfoModal();
  const {data = {}} = useMovie(movieId as string);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) return null;
  return (
    <div
      className="
    z-50
    fixed
    flex
    items-center
    justify-center
    inset-0
    duration-300
    bg-black
    bg-opacity-80
    overflow-x-hidden
    overflow-y-auto
    transition
  "
    >
      <div
        className="
        relative
        w-auto
        mx-auto
        rounded-md
        max-w-3xl
        overflow-hidden
    "
      >
        <div
          className={`
            ${isVisible ? "scale-100" : "scale-0"}
            transform
            duration-300
            relative
            flex-auto
            bg-zinc-900
            drop-shadow-md
        `}
        >
          <div className="h-96 relative">
            <video
              src={data?.videoUrl}
              poster={data?.thumbnailUrl}
              autoPlay
              muted
              loop
              className="w-full brightness-[60%] object-cover h-full"
            ></video>
            <div
              onClick={handleClose}
              className="
                cursor-pointer
                absolute
                top-3
                right-3
                h-10
                w-10
                rounded-full
                bg-black
                bg-opacity-70
                flex
                items-center
                justify-center           
            "
            >
              <AiOutlineClose className="text-white" size={25} />
            </div>
            <div className="absolute bottom-[10%] left-10 ">
              <p className="text-white text-3xl md:text-4xl  h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center ">
                <PlayButton movieId={data?.id} />
                <FavouriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <p className="text-green-400 font-sembold text-lg">New</p>
            <p className="text-white text-lg">{data?.duration}</p>
            <p className="text-white text-lg">{data?.genre}</p>
            <p className="text-white text-lg">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
