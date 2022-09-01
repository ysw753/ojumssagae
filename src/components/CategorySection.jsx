import styled from "styled-components";

const CategorySection = ({ selectedViewHandler }) => {
  return (
    <>
      <Category>
        <CategotyItem onClick={() => selectedViewHandler("food")}>
          음식
        </CategotyItem>
        <CategotyItem onClick={() => selectedViewHandler("쇼핑")}>
          쇼핑
        </CategotyItem>
        <CategotyItem onClick={() => selectedViewHandler("숙박")}>
          숙박
        </CategotyItem>
        <CategotyItem onClick={() => selectedViewHandler("문방구")}>
          문방구
        </CategotyItem>
        <CategotyItem onClick={() => selectedViewHandler("학교")}>
          학교
        </CategotyItem>
      </Category>
    </>
  );
};

export default CategorySection;

const Category = styled.section`
  margin: auto;
  display: flex;
  width: 50%;
  justify-content: space-between;
  padding: 50px;
`;
const CategotyItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: gray;
  &:hover {
    cursor: pointer;
  }
`;
