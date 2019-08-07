'use strict';

import getLatestTimes from '../app/nordakademie';

module.exports.updateTimetable = event => {
    getLatestTimes('A18b', '2').then(times => {
        console.log(times);
    })
};
