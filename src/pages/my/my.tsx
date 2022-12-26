import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";

import { AuthContext } from "service/authContext";

import { FbGetMyCards } from "service/card_repository";

import { useQuery } from "react-query";

import Profile from "./components/profile/profile";
import Preview from "../../components/preview";
import CardAddForm from "./components/cardForm";

import * as S from "./my.styled";

import { CardType } from "types";

const PATH = "MY_PAGE";
const My = () => {
  const userInfo = useContext(AuthContext);
  const userUid = userInfo!.uid;

  const { isLoading, data } = useQuery<CardType[]>(["myCards"], () =>
    FbGetMyCards(userUid)
  );
  // const [loading, setLoading] = useState<boolean>(true);
  // const [myCards, setMyCards] = useState<CardType[]>([]);

  const [cardAddModal, setCardAddModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // useEffect(() => {
  //   const loadingCard = async () => {
  //     await FbGetMyCards(userUid)
  //       .then((card: unknown) => {
  //         const dbCard = Object.values(card as CardType)
  //           .reverse()
  //           .map((data) => data);
  //         setMyCards(dbCard);
  //       })
  //       .catch(() => setMyCards([]));

  //     setLoading(false);
  //   };
  //   loadingCard();
  // }, [userUid, loading]);

  const handleCardModal = () => {
    if (cardAddModal === false) {
      document.body.style.overflow = "hidden";
      setCardAddModal(true);
    } else {
      document.body.style.overflow = "auto";
      setCardAddModal(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>my</title>
      </Helmet>
      <Profile />
      {data?.length === 0 ? (
        <S.CardContainer>
          <div>내가 만든 카드가 여기에 보관됩니다.</div>
          <button onClick={() => handleCardModal()}>새로운 카드 만들기</button>
        </S.CardContainer>
      ) : isLoading ? (
        <S.SpinnerContainer>
          <S.Spinner />
        </S.SpinnerContainer>
      ) : (
        <Preview
          PATH={PATH}
          cards={data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleCardModal={handleCardModal}
        />
      )}

      {cardAddModal && (
        <CardAddForm
          handleCardModal={handleCardModal}
          onCurrentPage={() => setCurrentPage(1)}
          userUid={userUid}
        />
      )}
    </>
  );
};

export default My;
