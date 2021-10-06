import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #191a30;
`;

export const Header = styled.View`
    z-index: 99;
    position: absolute;
    top: 35px;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0 14px;
    justify-content: space-between;

`;

export const HeaderButton = styled.TouchableOpacity`
    width: 46px;
    height: 46px;
    background-color: rgba(25,26,48,0.8);
    border-radius: 23px;
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.Image`
    width: 100%;
    height: 350px;
    border-bottom-left-radius: 70px;
    border-bottom-right-radius: 70px;
`;

export const ButtonLink = styled.TouchableOpacity`
    background-color: #E72f49;
    width: 63px;
    height: 63px;
    border-radius: 35px;
    position: absolute;
    top: 300px;
    right: 15px;
    justify-content: center;
    align-items: center;
    z-index: 99;
`;

export const Title = styled.Text`
    color: #FFF;
    font-size: 22px;
    font-weight: bold;
    padding: 8px 14px;
    margin-top: 8px;
`;