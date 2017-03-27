/**
 * Created by Chris on 17/3/27.
 */
const repos = require('./data');
const fs = require('fs');

module.exports = {
    store(){
        fs.writeFileSync(__dirname + '/data.json',JSON.stringify(repos));
    },
    get(index){
        return repos[index];
    },
    get list(){
        return repos;
    },
    add(article){
        repos.push(article);
        this.store();
    },
    del(index){
        repos.splice(index,1);
        this.store();
    },
    update(index,newArticle){
        repos.splice(index,1,newArticle);
        this.store();
    }
};

