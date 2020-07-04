exports.plotGraph = async (req, res) => {
    
    const { 
        restitution,
        dropHeight
     } = req.body

     try {
        const gravitational_constant = 9.8
        var bounceHeight = [];
        bounceHeight[0] = dropHeight

        var i=0;

        while(parseInt(bounceHeight[i]) > 0){
            bounceHeight[i+1] = bounceHeight[i]*Math.pow(restitution,2);
            i++;
        }
        
        var points = []
        bounceHeight.forEach((element, i) => {
            points[i] = Math.sqrt((2*element)/gravitational_constant) * (1+restitution*1)
        })

        for(let i = 0; i < points.length-1; i++){
            points[i+1] = points[i] + points[i+1]
        }

        var time = [];
        time[0]=0;
        bounceHeight.forEach((element,i) => {
            time[i] = 2*(Math.sqrt((2*Math.pow(restitution,2)*element)/gravitational_constant))
        });
        
        var t0 = Math.sqrt((2*dropHeight)/gravitational_constant) 
        
        var pitchPoints = [];
        pitchPoints[0] = t0 
        for(let i=0;i<time.length;i++){
            pitchPoints[i+1] = pitchPoints[i] + time[i]
        }

        points.unshift(0)
        points.pop()
        
        let heightsArray = []

        if(points.length == bounceHeight.length) {
            for(let i = 0; i < bounceHeight.length; i++) {
                heightsArray.push({
                    x: points[i],
                    y: bounceHeight[i]
                })
            }
        }

        let collisionPoints = [];
        for(let i = 0; i < pitchPoints.length; i++) {
            collisionPoints.push({
                x: pitchPoints[i],
                y: 0
            })
        }

        let data = [];

        for(let i = 0; i < heightsArray.length; i++) {
            data.push(heightsArray[i]);
            data.push(collisionPoints[i])
        }

        res.status(200).json({
            num_of_bounces: pitchPoints.length-1,
            data
        })
     }
     catch(err) {
        res.status(500).json(err);
     }


}