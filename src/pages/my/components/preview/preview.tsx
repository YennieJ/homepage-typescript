import React, { useState } from "react";

import { FbDeleteCard } from "service/card_repository";
import { FbDeleteImageFile } from "service/img_uploader";
import Edit from "../edit";

import Pagination from "../pagination";
import Detail from "./components/detail";

import * as S from "./preview.styled";

export interface CardType {
  id: number | undefined;
  cardName: string | undefined;
  fileURL: string;
  message: string | undefined;
  user: string | undefined;
}

interface PreviewProps {
  currentPage: number;
  setCurrentPage: any;
  cards: any;
  main?: string;
}

const itemsPerPage: number = 3;

const Preview = ({
  cards,
  currentPage,
  setCurrentPage,
  main,
}: PreviewProps) => {
  //수정
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [detailCard, setDetailCard] = useState<CardType>();

  const [editModal, setEditModal] = useState<boolean>(false);

  //한 페이지에 들어갈 아이템 설정 (itemsPerPage의 갯수만큼)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);

  //페이지 수 구하기
  const pages: number[] = [];
  for (let i = 1; i <= Math.ceil(cards.length / itemsPerPage); i++) {
    pages.push(i);
  }

  //여기 프로미스 사용해야 노란색 경고가 안뜬다는디
  const deleteCard = (cardId: number) => {
    if (window.confirm("삭제하시겠습니까?") === true) {
      FbDeleteCard(cardId);
      FbDeleteImageFile(cardId);
    } else return null;
  };

  //수정
  const onDetailModal = (card: CardType) => {
    setDetailCard(card);
    setDetailModal(true);
  };

  const onEditModal = (card: CardType) => {
    setDetailCard(card);
    setEditModal(true);
  };
  return (
    <>
      <S.Gridbox>
        {currentItems.map((card: CardType) => (
          <S.Container key={card.id}>
            <S.Overlay onClick={() => onDetailModal(card)}>
              {main ? null : (
                <S.OverlayContent>
                  <button onClick={() => onEditModal(card)}>Edit</button>
                  <button
                    onClick={() => {
                      deleteCard(card.id!);
                    }}
                  >
                    Delete
                  </button>
                </S.OverlayContent>
              )}
            </S.Overlay>
            <S.CardImage alt="" src={card.fileURL}></S.CardImage>
            <S.CardName>{card.cardName}</S.CardName>
          </S.Container>
        ))}
      </S.Gridbox>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
      {detailModal && (
        <Detail card={detailCard} onModalClose={() => setDetailModal(false)} />
      )}
      {editModal && (
        <Edit card={detailCard} onModalClose={setEditModal(false)} />
      )}
    </>
  );
};

export default Preview;
