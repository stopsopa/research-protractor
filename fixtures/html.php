<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Fixture php</title>
</head>
<body>
    <button id="bid">execute</button>

    <pre></pre>

    <div>lorem ipsum...</div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
        $(function () {

            var log = (function () {
                var pre = document.querySelector('pre');
                return function () {
                    var a = Array.prototype.slice.call(arguments);
                    if (a.length > 1) {
                        a = JSON.stringify(Array.prototype.slice.call(arguments), null, '    ')
                    }
                    else {
                        a = a[0];
                    }
                    pre.innerHTML = a + "\n" + pre.innerHTML;
                }
            }());

            var manipulation = {
                after: function (referenceNode, newNode) {
                    return this.before(referenceNode.nextSibling, newNode);
                },
                before: function (referenceNode, newNode) {
                    referenceNode.parentNode.insertBefore(newNode, referenceNode);
                    return this;
                },
                append: function (parentNode, newNode) {
                    parentNode.appendChild(newNode);
                    return this;
                },
                prepend: function (parentNode, newNode) {
                    parentNode.insertBefore(newNode, parentNode.firstChild);
                    return this;
                },
                remove: function (node) {
                    node.parentNode.removeChild(node);
                    return this;
                }
            };

            document.querySelector('button').addEventListener('click', function () {

                // input data;
//                var input = ('0123456789abcdefghijklmnoprstuwxyz'.repeat(1)).split('');
                var input = ('01234'.repeat(1)).split('');

                // how many simultanious request
                var limit = 3;

                // final callback
                function callback(data) {
                    log('finally: ', data)
                    var div = document.createElement('div');
                    div.setAttribute('id', 'done');
                    div.innerHTML = 'done...';
                    manipulation.append(document.body, div);
                }

                // method to process one piece of data
                function execute(v) {
                    return $.ajax('/fixtures/block.php?' + v).then(function () {
                        log(v + ' processed')
                        return v;
                    });
                }

                (function (input, execute, limit) {
                    var output = [], count = 0;
                    (limit < 1) && (limit = 1);
                    return new Promise(function (resolve) {
                        (function next() {
                            if (input.length) {
                                if (count < limit) {
                                    count += 1;
                                    execute(input.shift()).then(function (data) {
                                        output = output.concat([data]);
                                        count -= 1;
                                        next();
                                    });
                                    next();
                                }
                                return;
                            }
                            count || resolve(output);
                        }());
                    });
                }(input, execute, limit)).then(callback);
            });


//            (function () {
//
//                var target = document.querySelector('pre');
//
//                // create an observer instance
//                var observer = new MutationObserver(function(mutations) {
//                    mutations.forEach(function(mutation) {
//                        console.log(mutation);
//                    });
//                });
//
//                // configuration of the observer:
//                var config = { attributes: true, childList: true, characterData: true };
//
//                // pass in the target node, as well as the observer options
//                observer.observe(target, config);
//
//                // later, you can stop observing
////                observer.disconnect();
//
//            }());
        });
    </script>
</body>
</html>