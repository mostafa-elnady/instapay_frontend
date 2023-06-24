import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUserTransactions } from "../../reduxToolkit/slices/walletSlice"

const WalletHook = () => {

    const [userTransActions,setUserTransActions] = useState([])

    const dispatch = useDispatch()
    
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        dispatch(getAllUserTransactions(user?.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const userTransactionsResponse = useSelector(state => state.wallet.walletTransactions)

    useEffect(()=>{

        if(userTransactionsResponse && userTransactionsResponse.length !== 0){
            setUserTransActions(userTransactionsResponse)
        }
    },[userTransactionsResponse])


    return [userTransActions]
}

export default WalletHook