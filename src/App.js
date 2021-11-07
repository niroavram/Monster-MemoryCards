import './App.css';
import React,{useEffect,createContext,useReducer,useContext,useState} from 'react';
import { images } from './constants';
import {Grid,Container,Button, Avatar,Link,CardMedia,Card,CardContent,Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  root: {
display:'grid',
textAlign: 'center',
justifyContent: 'center',
backgroundColor: "#a8dadc"
  },
  header: {
    display:'flow-root',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: "#e9c46a"
      },
  media: {
    padding:10,
    minWidth: 100,
    height:150,
    borderRadius: "15px",
  },
  card: {
    margin: 10,
    
  },
  cards: {
    display:"flex",
    justifyContent:"center",
    padding:10,
  },
  btn: {
    backgroundColor: 'green',
    color: 'white',
    width: 200,
    height: 70,
    fontSize: 25
  },

}));

function App() {
  const {monArr,back,logo} = images
  const mon1="https://res.cloudinary.com/niroavram/image/upload/v1636280274/8_wiv7c0.png"
  const [cardsChosen,setCardsChosen] = useState(null)
  const [memoryArr,setmemoryArr] = useState(null)

  const shuffle=(array)=> {
    let currentIndex = array.length,  randomIndex;
    const arrTemp =array
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      let temp = arrTemp[randomIndex]
      arrTemp[randomIndex] = arrTemp[currentIndex]
      arrTemp[currentIndex] = temp
   
    }
    setmemoryArr(arrTemp)
  }
  
  if(memoryArr===null){
   
    shuffle(monArr)
  }
  const suffleButton= ()=>{
    const a = memoryArr
  for(let i=0;i<memoryArr.length;i++){
  a[i].isChosen=false
  }
  shuffle(a)
  window.location.reload(false);

  }
  const checkMemory= (card,index)=>{
    const a = memoryArr
    console.log(index)
    if(card.isChosen===true){
      alert("The Card is already open")
    }else{
      
      if(cardsChosen===null){
        setCardsChosen([card])
        console.log(a[index])
        a[index].isChosen=true
      }else{
        if(cardsChosen[0].value===card.value){
          
          setCardsChosen(null)
        }else{
          
          for(let i=0;i<memoryArr.length;i++){
            if(cardsChosen[0].value===a[i].value){
              a[i].isChosen=false
            }
          }
          setCardsChosen(null)
        }
      }
    }
    setmemoryArr(a)
    if(memoryArr.every(mon=>mon.isChosen)){
      alert("Winner WIN WIN Winner")
    }
  }
  const secondErrCard = (index)=>{
    const a = memoryArr
    a[index].isChosen=false
    setmemoryArr(a)

  }
  const classes =  useStyles();
  return (
      <div className={classes.root}>
        <div  className={classes.header}>
          <img className={classes.media} src={logo} title=" lol"/>
          <h1>Memory Monster</h1>

        </div>
        

          <Grid className={classes.cards} container spacing={1}>
{memoryArr!==null? 
  <>
   {memoryArr.map((card,index)=>{
     return(
       <Grid className={classes.card} key={index} item xs={5} sm={2} md={2} lg={2} xl={1} >
      <Link    onClick={()=>checkMemory(card,index)} >
      {card.isChosen?
      <img className={classes.media} src={card.pic} title=" lol"/>
     : <img className={classes.media} src={back} title=" lol"/>}
    </Link>
    </Grid>
     )
  
   })}
 </>
:""}

</Grid>
    <Button className={classes.btn} onClick={suffleButton}>
      Shuffle 
    </Button>
      </div>
  );
}

export default App;
