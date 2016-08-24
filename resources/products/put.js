if(me === undefined || me.username != "admin"){
    cancel("no authorization",401);
}