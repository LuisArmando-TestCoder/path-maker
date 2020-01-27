export class MapTravel {
    private stringifyZone = ({ x, y }) => x !== y ? `${x}_${y}` : x;
    private makeJSONZone = zone => {
        const [zoneX, zoneY] = zone.split('_');
        const x = +zoneX;
        const y = !isNaN(+zoneY) ? zoneY : zoneX;
        return { x, y: +y }
    }

    toJSON(travelString) {
        const travelerStrings = travelString.split('t').splice(1);
        // 1.50z10z30_40 0.5_200z200

        const zoneIndexes = travelerStrings.map(traveler => +traveler.split('.')[0]);
        // 1 5

        const travelerZones = travelerStrings.map(traveler => {
            const zoneRegExp = /\.([0-9_]*)z/i;
            return this.makeJSONZone(zoneRegExp.exec(traveler)[1]);
        });
        // {x: 50, y: 50} {x: 5, y: 20}

        const zones = travelerStrings.map(traveler => {
            const zoneTuples = traveler.split('z').filter((_, i) => i);
            return zoneTuples.map(zoneTuple => this.makeJSONZone(zoneTuple));
        });
        /*  
            [
                {x: 10, y: 10}
                {x: 30, y: 40}
            ]
            [
                {x: 200, y: 200}
            ]
        */

        const travelers = zoneIndexes.map((zoneIndex, i) => {
            const { x, y } = travelerZones[i];
            return { zoneIndex, x, y, originalPositions: { x, y } };
        });

        return { travelers, zones };
    }

    toString({travelers, zones}) {
        let travelString = '';

        // attachments
        travelers.forEach((traveler, i) => {
            travelString += `t${traveler.zoneIndex}.`;
            travelString += this.stringifyZone(traveler.originalPositions);

            zones[i].forEach(zone => {
                travelString += `z${this.stringifyZone(zone)}`;
            });
        });

        return travelString;
    }
}
