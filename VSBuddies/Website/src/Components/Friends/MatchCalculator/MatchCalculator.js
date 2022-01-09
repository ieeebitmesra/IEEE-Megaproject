
export default function MatchCalculator(person1,person2) {
    
    // to calculate similarity Dice-Similarity is used

    // get common interests
    let sameInterests = 0; 
    const interestSet = new Set(person2.interests);
    person1.interests.forEach(interest => {
        if(interestSet.has(interest)) sameInterests+=1;
    });
    let interestMatch = ((2*sameInterests)/(person1.interests.length+person2.interests.length));
    if(isNaN(interestMatch)){
        interestMatch = 0;
    }

    // get common extensions 
    const extensionSet = new Set(person2.extensions);
    let sameExtensions = 0;
    person1.extensions.forEach(extension => {
        if(extensionSet.has(extension)) sameExtensions+=1; 
    });
    let extensionMatch = ((2*sameExtensions)/(person1.extensions.length+person2.extensions.length));
    if(isNaN(extensionMatch)){
        extensionMatch = 0;
    }
    // theme match
    const themeMatch = person1.theme===person2.theme?1:0;
    
    // top two languages match
    let topTwoLanguagesMatch = 0;
    if(person1.topTwoLanguages.includes(person2.topTwoLanguages[0])) topTwoLanguagesMatch+=.5;
    if(person1.topTwoLanguages.includes(person2.topTwoLanguages[1])) topTwoLanguagesMatch+=.5;
    
    // college match
    const collegeMatch = person1.college===person2.college?1:0;

    // matchPercent-> how similar person2 & person1 are 
    const matchPercent = ((interestMatch*4 + extensionMatch*2 + (collegeMatch)+ (themeMatch)
                                +topTwoLanguagesMatch*2)*10).toFixed(2);
    
    return matchPercent;
}

// Weight Distribution:
// 40% to interest match
// 20% to extension match
// 20% to top two languages match
// 10% to college match
// 10% to theme match





