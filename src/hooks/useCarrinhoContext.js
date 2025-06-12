import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";
import {
  ADD_PRODUTO,
  REMOVE_PRODUTO,
  UPDATE_QUANTIDADE,
} from "../reducers/carrinhoReducer";

const addProdutoAction = (produto) => ({
  type: ADD_PRODUTO,
  payload: produto,
});
const removeProdutoAction = (id) => ({
  type: REMOVE_PRODUTO,
  payload: id,
});
const updateQuantidadeAction = (id, quantidade) => ({
  type: UPDATE_QUANTIDADE,
  payload: { produtoId: id, quantidade },
});

export const useCarrinhoContext = () => {
  const { carrinho, dispatch, quantidade, valorTotal } =
    useContext(CarrinhoContext);

  function adicionarProduto(produto) {
    dispatch(addProdutoAction(produto));
  }

  function removerProduto(id) {
    const produtoExistente = carrinho.find((item) => item.id === id);
    if (produtoExistente && produtoExistente.quantidade > 1) {
      dispatch(updateQuantidadeAction(id, produtoExistente.quantidade - 1));
    } else {
      dispatch(updateQuantidadeAction(id));
    }
  }

  function removerProdutoCarrinho(id) {
    dispatch(removeProdutoAction(id));
  }

  return {
    carrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    quantidade,
    valorTotal,
  };
};
