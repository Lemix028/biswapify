try {
document.body.style.border = "1px solid red";
console.log("Loaded Biswapify");
setInterval(() => {
    var rootContainer = document.getElementsByClassName('kVPQOL')[0];
    var bswPrice = Number(document.getElementsByClassName('hiiYWG')[0].innerHTML);
    if(rootContainer.firstChild != null){
        
        var FinalStakedBSW = 0
        var FinalStakedBSWValue = 0
        var FinalEarnedBSW = 0
        var FinalEarnedBSWValue = 0
        var TotalUsdEarned = 0;
        var EarnedTokens = [];
        var StakedTokens = [];
        var biswapifyWidget = undefined;
        for (const child of rootContainer.children) {
            var WidgetInnerContent = child.getElementsByClassName('ffISaY')[0];
            if(child.className == "biswapifyWidget"){
                biswapifyWidget = child;
            }
            if(WidgetInnerContent == undefined)
            {
                WidgetInnerContent = child.getElementsByClassName('fqKiKh')[0];
                if(WidgetInnerContent == undefined)
                WidgetInnerContent = child.getElementsByClassName('dmhnka')[0];
                
                if(WidgetInnerContent == undefined)
                    continue;
            } 
            var StakedBSWContainer = WidgetInnerContent.getElementsByClassName('huNIDp')[0].firstChild;
            var StakedBSW = StakedBSWContainer.getElementsByClassName('pZlZO')[0].innerHTML;
            var StakedBSWValue = StakedBSWContainer.getElementsByClassName('inQEff')[0].innerHTML;
            var BlockTimeContainer = Number(child.getElementsByClassName('fyWIRV')[0]?.firstChild?.firstChild?.getElementsByClassName('ekMRHH')[1]?.getElementsByClassName('hmyuBF')[0]?.innerHTML.replace(/[^\d.-]/g, ''));

            var EarnedContainer = WidgetInnerContent.getElementsByClassName('hdrmpd')[0];
            var EarnedBSW = "0";
            var EarnedBSWValue = "0";
            if(EarnedContainer == undefined)
            {
                EarnedContainer = WidgetInnerContent.getElementsByClassName('kUuiI')[0];
                if(EarnedContainer != undefined){
                    EarnedTokens.push({
                    symbol: EarnedContainer.firstChild.getElementsByClassName('fhUTgb')[0].innerHTML.split(/(\s+)/)[2],
                    valueToken: Number(EarnedContainer.firstChild.getElementsByClassName('fhUTgb')[0].innerHTML.split(/(\s+)/)[0]),
                    valueUsd: Number(EarnedContainer.firstChild.getElementsByClassName('fsFiWv')[0].innerHTML.replace(/[^\d.-]/g, '')),
                    blockTime: BlockTimeContainer}
                    );
                    TotalUsdEarned += Number(EarnedContainer.firstChild.getElementsByClassName('fsFiWv')[0].innerHTML.replace(/[^\d.-]/g, ''));
                }
        
            } else
            {
                EarnedBSW = EarnedContainer.firstChild.getElementsByClassName('fhUTgb')[0].innerHTML;
                EarnedBSWValue = EarnedContainer.firstChild.getElementsByClassName('fsFiWv')[0].innerHTML;
                EarnedTokens.push({
                    symbol: EarnedContainer.children[1].getElementsByClassName('fhUTgb')[0].innerHTML.split(/(\s+)/)[2],
                    valueToken: Number(EarnedContainer.children[1].getElementsByClassName('fhUTgb')[0].innerHTML.split(/(\s+)/)[0]),
                    valueUsd: Number(EarnedContainer.children[1].getElementsByClassName('fsFiWv')[0].innerHTML.replace(/[^\d.-]/g, '')),
                    blockTime: BlockTimeContainer}
                    );
                    TotalUsdEarned += Number(EarnedContainer.children[1].getElementsByClassName('fsFiWv')[0].innerHTML.replace(/[^\d.-]/g, ''));
            }
        
            FinalEarnedBSW += Number(EarnedBSW.replace(/[^\d.-]/g, ''));
            FinalEarnedBSWValue += Number(EarnedBSWValue.replace(/[^\d.-]/g, '')); 
            FinalStakedBSW += Number(StakedBSW.replace(/[^\d.-]/g, ''));
            FinalStakedBSWValue += Number(StakedBSWValue.replace(/[^\d.-]/g, ''));
            
          }
        
          EarnedTokens.push({
            symbol: "BSW",
            valueToken: FinalEarnedBSW,
            valueUsd: FinalEarnedBSWValue,
            blockTime: ""}
            );
            StakedTokens.push({
                symbol: "BSW", valueToken: FinalStakedBSW, valueUsd: FinalStakedBSWValue
            });
        
            
            var biswapifyWidgetComponents = [];
            
            for(const token of EarnedTokens)
            {
                if(!isEven(EarnedTokens.indexOf(token)+1)){
                    var biswapifyWidgetComponentsHeader = document.createElement("div");
                    biswapifyWidgetComponentsHeader.style =`display: flex; -moz-box-pack: justify; justify-content: space-between; -moz-box-align: center; align-items: center;`;
                    biswapifyWidgetComponents.push(biswapifyWidgetComponentsHeader);
                }
                
                biswapifyWidgetComponents[biswapifyWidgetComponents.length - 1].innerHTML +=` 
                <div style="padding: 12px 24px; width: 50%">
                    <div style="color: rgb(112, 141, 183);
                        font-weight: 600;
                        margin-bottom: 2px;
                        font-size: 12px;
                        line-height: 18px;">
                        Earned `+ token.symbol +`
                        </div>
                    <div style=" color: rgb(29, 200, 114);
                        font-size: 18px;
                        font-weight: 700;">
                        `+ token.valueToken.toFixed(5) + ` `+ token.symbol +`
                        </div>
                    <div style="color: rgb(7, 22, 45);
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 18px;">
                        $`+ token.valueUsd.toFixed(4) + `
                    </div>
                    `
                    + ((token.blockTime == NaN) ? `` : `<div style="color: rgb(112, 141, 183);
                    font-weight: 500;
                    margin-bottom: 2px;
                    font-size: 12px;
                    line-height: 18px;">
                    `+ secondsToDhms(token.blockTime*3) +`
                    </div>`) +
                    `
                </div>`;
            }
            var biswapifyWidgetComponentsString = "";
            for(const e of biswapifyWidgetComponents){
                biswapifyWidgetComponentsString += e.outerHTML;
            }
        
    
        if(biswapifyWidget == undefined){
            biswapifyWidget = document.createElement("div");
            biswapifyWidget.style = `border-radius: 16px;background: rgb(228, 239, 255);overflow: hidden;align-self: flex-start;`;
            biswapifyWidget.className = "biswapifyWidget";
            rootContainer.prepend(biswapifyWidget);
        }
         
        biswapifyWidget.innerHTML = `   
                <div style="
                display: flex;
                height: 130px;
                padding-bottom: 16px;
                background: linear-gradient(90deg, rgb(0, 34, 86) 0%, rgb(5, 70, 184) 100%);
                ">
                <div style="  color: rgb(255, 255, 255);
                font-weight: 600;
                font-size: 22px;
                line-height: 26px;
                padding: 24px 24px;
                border-radius: 16px 16px 0px 0px;
              }">Biswapify</div>
                </div>
          <div sytle="display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 12px;
          ">
          <div style="display: flex;
            -moz-box-pack: justify;
            justify-content: space-between;
            -moz-box-align: center;
            align-items: center;">
          <div style="padding: 12px 24px; width: 50%">
                <div style="color: rgb(112, 141, 183);
                font-weight: 600;
                margin-bottom: 2px;
                font-size: 12px;
                line-height: 18px;">Total Staked BSW</div>
                <div style=" color: rgb(29, 200, 114);
                font-size: 18px;
                font-weight: 700;">`+ StakedTokens[0].valueToken.toFixed(5) + " " + StakedTokens[0].symbol + `</div>
                <div style="color: rgb(7, 22, 45);
                font-weight: 400;
                font-size: 12px;
                line-height: 18px;">`+ "$" + StakedTokens[0].valueUsd.toFixed(4) + `</div>
            </div>
    
            <div style="padding: 12px 24px; width: 50%">
                <div style="color: rgb(112, 141, 183);
                font-weight: 600;
                margin-bottom: 2px;
                font-size: 12px;
                line-height: 18px;">Total Earned in BSW</div>
                <div style=" color: rgb(29, 200, 114);
                font-size: 18px;
                font-weight: 700;">`+ (TotalUsdEarned/bswPrice).toFixed(5) + " " + StakedTokens[0].symbol + `</div>
                <div style="color: rgb(7, 22, 45);
                font-weight: 400;
                font-size: 12px;
                line-height: 18px;">`+ "$" + TotalUsdEarned.toFixed(4) + `</div>
            </div>
    
            </div>
          </div>
          ` + biswapifyWidgetComponentsString + ` 
          </div>
        
          `;
    } 
    //console.error("looped succesfully");
}, 5000); //5000ms loop

    
function isEven(value){
        return value%2 == 0;
}

function secondsToDhms(seconds) {
    var d = Math.floor(Number(seconds) / (3600*24));
    var h = Math.floor(Number(seconds) % (3600*24) / 3600);
    var m = Math.floor(Number(seconds) % 3600 / 60);
    var s = Math.floor(Number(seconds) % 60);
    return (d > 0 ? d + "d " : "") + (h > 0 ? h + "h " : "") + (m > 0 ? m + "m " : "") + (s > 0 ? s + "s " : "");
    }

} catch (error) {
    console.error(error);
  }
  