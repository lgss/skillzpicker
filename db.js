const Skill = require('./models/skill.js');

const index = (model) => {
    return new Promise((resolve, reject) => {
        var stream = model.synchronize(), count = 0;
        stream.on('data', function (err, doc) {
            count++;
        });
        stream.on('close', ()=>{
            resolve(count);
        });
        stream.on('error', reject);
    })
}

const allSkills = () => {
    return Skill.find()
}

const searchSkills = (name) => {
    return new Promise((resolve, reject) => {
        Skill.search(
            {
                match: {
                    name: {
                        query: name,
                        fuzziness: 'AUTO'
                    }
                }
            },
            { 
                hydrate: true
            },
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        )

    })
}

module.exports = {
    allSkills: allSkills,
    searchSkills: searchSkills,
    index: index
}

