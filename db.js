const Skill = require('./models/skill.js');
const mongoose = require('mongoose');
const DBUSER = process.env.DBUSER;
const DBPWD = process.env.DBPWD;
const DBLINK = process.env.DBLINK;

const index = (model) => {
    return new Promise((resolve, reject) => {
        var stream = model.synchronize(), count = 0;
        stream.on('data', function (err, doc) {
            count++;
        });
        stream.on('close', () => {
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

const connect = () => mongoose.connect(`mongodb://${DBUSER}:${DBPWD}@${DBLINK}`)
    .then(response => {
        console.log("Connected to mongodb");
        Promise.resolve(response);
    })


module.exports = {
    allSkills: allSkills,
    searchSkills: searchSkills,
    index: index,
    connect: connect
}

