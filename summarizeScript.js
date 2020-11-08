summarizedTerms = document.body.innerText;

var definitionsURL = 'https://project-h-2020.herokuapp.com/definitions';
var summarizeURL = 'https://project-h-2020.herokuapp.com/summary';

function scan(data)
        {
            var pairs = new Map();
            var keywords = JSON.parse(data);
            for (const [index, pair] of Object.entries(keywords))
            {
                for (const [key, definition] of Object.entries(pair))
                {
                    pairs[key] = definition;
                }
            }

            var elements = document.body.getElementsByClassName("summarizedTerms");
            var elementsArr = [].slice.call(elements);

                for(element of elementsArr)
                {
                    var text = element.innerHTML; 
                    var textSplit = text.split(" "); 
                    
                    var newInnerHTML = [];
                    for(word of textSplit)
                    {
                        if(pairs[word.toLowerCase()] && word.toLowerCase() !="has" && word.toLowerCase() != "will" && word.toLowerCase() != "set" && word.toLowerCase() != "delete")
                        {
                            newInnerHTML.push('<span class="tooltip" data-text="' + pairs[word.toLowerCase()] + '">');
                            newInnerHTML.push(word);
                            newInnerHTML.push('</span>');
                        }
                        else
                        {   
                            newInnerHTML.push(word);
                        }
                    }

                    element.innerHTML = newInnerHTML.join(" ");
                }

        }


function summarize(data)
{
    document.body.innerHTML += data;

    var req = new XMLHttpRequest(); 
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            scan(req.responseText)
        }
    };
    req.open('GET', definitionsURL); 
    req.send(); 

}

var req = new XMLHttpRequest(); 
req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        summarize(req.responseText);
    }
};
req.open('POST', summarizeURL); 
req.send(summarizedTerms); 