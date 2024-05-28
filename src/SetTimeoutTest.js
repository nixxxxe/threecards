import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react"


let  cardFace = ["hearts","diamonds","clubs","spades"]
let cardIndex = ["ace",2,3,4,5,6,7,8,9,10,"jack","queen","king"]
var ctr=0;

export default function Card(){
    const [cards,setCard] = useState(new Array(4).fill(new Array(13).fill(0)))
    const [counter,setCounter] = useState(0)
    const [halt,setHalt] = useState(true)
    const [playerScore, setPlayerScore] = useState([0,0])

    const c1u1 = useRef();
    const c2u1 = useRef();
    const c3u1 = useRef();

    const c1u2 = useRef();
    const c2u2 = useRef();
    const c3u2 = useRef();

    const u1cs = useRef([]);
    const u2cs = useRef([]);




    useEffect(()=>{
        console.log(halt)
        if(halt)
            return;
        var x = Math.floor(Math.random()*4)
        var y = Math.floor(Math.random()*13)
        while(cards[x][y]!==0  && ctr<52){
            x = Math.floor(Math.random()*4)
             y = Math.floor(Math.random()*13)
             ctr++;
        }
        if(ctr<52){
            ctr = 0;
            var tmp = cards.map( z => ([...z]))
            switch(counter){
                case 0: tmp[x][y] = 1;
                        c1u1.current.src = "cards/"+ cardIndex[y] +"_of_"+cardFace[x]+".png"
                        u1cs.current = [...u1cs.current, y+1];
                        break;
                case 1: tmp[x][y] = 1;
                        c2u1.current.src = "cards/"+ cardIndex[y] +"_of_"+cardFace[x]+".png"
                        u1cs.current = [...u1cs.current, y+1];
                        break;
                case 2: tmp[x][y] = 1;
                        c3u1.current.src = "cards/"+ cardIndex[y] +"_of_"+cardFace[x]+".png"
                        u1cs.current = [...u1cs.current, y+1];
                        break;
                case 3: tmp[x][y] = 1;
                        c1u2.current.src = "cards/"+ cardIndex[y] +"_of_"+cardFace[x]+".png"
                        u2cs.current = [...u2cs.current, y+1];
                        break;
                case 4: tmp[x][y] = 1;
                        c2u2.current.src = "cards/"+ cardIndex[y] +"_of_"+cardFace[x]+".png"
                        u2cs.current = [...u2cs.current, y+1];
                        break;
                case 5: tmp[x][y] = 1;
                        c3u2.current.src = "cards/"+ cardIndex[y] +"_of_"+cardFace[x]+".png"
                        u2cs.current = [...u2cs.current, y+1];
                        break;
            }
            if(counter===5)
            {
                setCounter(0);
                setHalt(true);
                checkWin();
            }
            else
                setCounter(counter+1);
            setTimeout(()=>{setCard(tmp)},300);
        }
        
    },[cards,halt])

    function checkWin(){
        var u1 = u1cs.current.map((n)=>{return (n===1)?14:n}) 
        u1 = u1.sort(function(a, b){return a - b});
        var u2 = u2cs.current.map((n)=>{return (n===1)?14:n}) 
        u2 = u2.sort(function(a, b){return a - b});
        var u2 = u2cs.current.sort(function(a, b){return a - b});
        // check pairs
        var p1 = 0, p2=0, p1_3 = 0, p2_3 = 0;
        if(u1[0]===u1[1]){p1=u1[0]; p1_3=u1[2]}
        else if(u1[1]===u2[2]){p1=u1[1]; p1_3=u1[0]}
        else if(u1[0]===u1[2]){p1=u1[0]; p1_3=u1[1]}
        if(u2[0]===u2[1]){p2=u2[0]; p2_3=u2[2]}
        else if(u2[1]===u2[2]){p2=u2[1];p2_3=u2[0]}
        else if(u2[0]===u2[2]){p2=u2[0];p2_3=u2[1]}
        if(p1==0 && p2==0) // no par
        {
            if(u1[2]>u2[2])
                setPlayerScore([playerScore[0]+1,playerScore[1]])
            else if(u2[2]>u1[2])
                setPlayerScore([playerScore[0],playerScore[1]+1])
            else if(u1[1]>u2[1])
                setPlayerScore([playerScore[0]+1,playerScore[1]])
            else if(u2[1]>u1[1])
                setPlayerScore([playerScore[0],playerScore[1]+1])
            else if(u1[0]>u2[0])
                setPlayerScore([playerScore[0]+1,playerScore[1]])
            else if(u2[0]>u1[0])
                setPlayerScore([playerScore[0],playerScore[1]+1])
            else
                alert("draw");// impossible
        }
        else if(p1==p2){
            if(p1_3>p2_3)
                setPlayerScore([playerScore[0]+1,playerScore[1]])
            else if(p2_3>p1_3)
                setPlayerScore([playerScore[0],playerScore[1]+1])
            else
                alert("Tied!")
        }
        else{
            if(p1>0)
                setPlayerScore([playerScore[0]+1,playerScore[1]])
            if(p2>0)
                setPlayerScore([playerScore[0],playerScore[1]+1])
        }
    }

    return (
        <div style={{width:810, margin:'0 auto'}}>
            <h1 style={{textAlign:'center'}}>Three Cards</h1>
            <div style={{width:400,height:320, display:"inline-block",textAlign:'center', border:"solid 1px #333"}}>
                <br/>
                <img ref={c1u1} style={{width:120, display:'inline-block'}} src="cards/blank.png"/>
                <img ref={c2u1} style={{width:120, display:'inline-block'}} src="cards/blank.png"/>
                <img ref={c3u1} style={{width:120, display:'inline-block'}} src="cards/blank.png"/>
                <br/>
                <h1>Player 1: {playerScore[0]}</h1>
            </div>
            <div style={{width:400,height:320, display:"inline-block",textAlign:'center', border:"solid 1px #333"}}>
            <br/>
                <img ref={c1u2} style={{width:120, display:'inline-block'}} src="cards/blank.png"/>
                <img ref={c2u2} style={{width:120, display:'inline-block'}} src="cards/blank.png"/>
                <img ref={c3u2} style={{width:120, display:'inline-block'}} src="cards/blank.png"/>
                <br/>
                <h1>Player 2: {playerScore[1]}</h1>
            </div>
            <Button variant="contained" sx={{margin:'1%', width: '97%'}} onClick={()=>{setHalt(false);
             c1u1.current.src = "cards/blank.png";
             c2u1.current.src = "cards/blank.png";
             c3u1.current.src = "cards/blank.png";
             c1u2.current.src = "cards/blank.png";
             c2u2.current.src = "cards/blank.png";
             c3u2.current.src = "cards/blank.png";
             u1cs.current = []
             u2cs.current = []
            }}>Draw Cards</Button>
            
        </div>
    )
}