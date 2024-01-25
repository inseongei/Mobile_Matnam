import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// 조회수 증가
export const IncraseSee = async ({ id }) => {
  const recipeDocRef = await getDoc(doc(db, "recipe", id));
  const seeField = recipeDocRef.data().see;
  const updateData = {
    see: seeField + 1,
  };

  await updateDoc(doc(db, "recipe", id), updateData);
};

// 좋아요 증가
export const IncreaseHeart = async ({ recipeId, email }) => {
  const recipeDocRef = await getDoc(doc(db, "recipe", recipeId.id));
  const likeField = recipeDocRef.data().heart;

  if (likeField.includes(email)) {
    const heart = likeField.filter((item) => item !== email);
    const updateData = {
      heart,
    };
    await updateDoc(doc(db, "recipe", recipeId.id), updateData);
  } else {
    const heart = [...likeField, email];
    const updateData = {
      heart,
    };
    await updateDoc(doc(db, "recipe", recipeId.id), updateData);
  }
};
