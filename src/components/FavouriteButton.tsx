import React from "react";
import axios from "axios";
import {useCallback, useMemo} from "react";
import useFavourite from "@/hooks/useFavourite";
import useCurrentUser from "@/hooks/useCurrentUser";
import {AiOutlinePlus, AiOutlineCheck} from "react-icons/ai";

interface FavouriteButtonProps {
  movieId: string;
}
const FavouriteButton: React.FC<FavouriteButtonProps> = ({movieId}) => {
  const {mutate: mutateFavourites} = useFavourite();
  const {data: currentUser, mutate} = useCurrentUser();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourites = useCallback(async () => {
    let response;
    if (isFavourite) {
      response = await axios.delete("/api/favourites", {
        data: {movieId},
      });
    } else {
      response = await axios.post("/api/favourites", {movieId});
    }

    const updatedFavouritesIds = response?.data?.favouriteIds;
    mutate({
      ...currentUser,
      favouriteIds: updatedFavouritesIds,
    });
    mutateFavourites();
  }, [movieId, currentUser, isFavourite, mutate, mutateFavourites]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavourites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10
  
  border-white border-2 flex rounded-full justify-center items-center 
  hover:border-neutral-300
  transition"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavouriteButton;
