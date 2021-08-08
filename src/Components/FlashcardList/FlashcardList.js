import React from "react";
import Flashcard from "../Flashcard/Flashcard";

function FlashcardList({ quizes }) {
  return (
    <div className="card-grid">
      {quizes.map((quiz) => {
        return <Flashcard quiz={quiz} key={quiz.id} />;
      })}
    </div>
  );
}

export default FlashcardList;
