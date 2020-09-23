import React from 'react';
const RestartGame = (props)=>{
    return (
        <button className="reset-game-btn" 
         onClick={()=>props.onClick()}
        >Restart Game</button>
    );
};

export default RestartGame;