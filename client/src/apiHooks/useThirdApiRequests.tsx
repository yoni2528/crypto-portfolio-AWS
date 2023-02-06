// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { tokenData, tokenSelectedActions } from '../store/reducers/tokenSelectedReducer'
import { useDispatch } from 'react-redux'
import useRequest from './useRequest'

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/'

const useThirdApiRequests = () => {
  const dispatch = useDispatch()
  const { handleGetRequest, handleThirdPartyApiRequest } = useRequest()

  const handleTokenSelectedRequest = async (token: string) => {
    const data = await handleGetRequest({
      url: `${COINGECKO_URL}${token}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      method: 'GET',
    })
    if (!data) return
    const dataObj: tokenData = {
      name: token,
      img: data.image.thumb,
      price: data.market_data.current_price.usd,
      lastDayProfit: data.market_data.price_change_24h,
      symbol: data.symbol,
    }
    dispatch(tokenSelectedActions.tokenSelectedData(dataObj))
  }

  const handleTopPerfoemanceRequest = async () => {
    const data = await handleGetRequest({
      url: `https://api.coingecko.com/api/v3/search/trending`,
      method: 'GET',
    })
    if (!data) return
    const btcPrice = await handleGetBtcPrice()
    const coinsData = data.coins.map(
      (coin: { item: { name: string; price_btc: number; symbol: string } }) => {
        return {
          name: coin.item.name,
          price: coin.item.price_btc * btcPrice,
          symbol: coin.item.symbol,
        }
      }
    )

    return coinsData
  }

  const handleNewsRequest = async () => {
    const data = await handleThirdPartyApiRequest({
      url: `https://www.reddit.com/r/CryptoCurrency/new.json`,
      method: 'GET',
    })
    // console.log(data.data.children[0].data.title);
    if (!data) return
    return data.data.children
  }

  const handleGetBtcPrice = async () => {
    const data = await handleGetRequest({
      url: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
      `,
      method: 'GET',
    })
    if (!data) return
    return data.bitcoin.usd
  }

  const handleHotTokensList = async () => {
    const data = await handleGetRequest({
      url: `https://lunarcrush.com/api3/coinoftheday/info`,
      method: 'GET',
    })
    if (!data) return
    const dataObj = data.history.slice(0, 15).map((coin: any) => {
      return {
        name: coin.name,
        symbol: coin.symbol,
      }
    })

    return dataObj
  }

  return {
    handleTokenSelectedRequest,
    handleTopPerfoemanceRequest,
    handleNewsRequest,
    handleHotTokensList,
  }
}

export default useThirdApiRequests
