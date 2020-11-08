var definitionsURL = 'https://project-h-2020.herokuapp.com/definitions';

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

            var elements = document.body.getElementsByTagName("*");
            var elementsArr = [].slice.call(elements);
            elementsArr.pop();

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

        
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                scan(xhttp.responseText)  
            }
        };
        xhttp.open('GET', definitionsURL); 
        xhttp.send(); 
        