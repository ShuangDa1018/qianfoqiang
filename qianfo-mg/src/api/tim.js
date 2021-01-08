import TIM from "tim-js-sdk"
import COSSDK from "cos-js-sdk-v5"

//初始化
let appId = "1400389468"
const tim = TIM.create({
    SDKAppID: appId
})
tim.setLogLevel(2);
tim.registerPlugin({
    'cos-js-sdk': COSSDK
})
export default tim