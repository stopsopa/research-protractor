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
    <div>init.</div>

    <pre></pre>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
        $(function () {

            var log = (function () {
                var pre = document.querySelector('pre');

                return function (msg) {
                    pre.innerHTML = msg + "\n" + pre.innerHTML;
                }
            }());



            (function (input, output) {
                output = [];
                return (function chain() {
                    return new Promise(function (resolve, reject) {
                        var v = input.pop();
                        log('new promise: ' + v)
                        setTimeout(function () {
                            resolve(v + '-processed');
                        }, 300);
                    }).then(function (r) {
                        log('then: ' + r)
                        return input.length ? chain() : output.concat([r]);
                    });
                }());
            }('1234'.split(''))).then(function (data) {
                console.log('finally: ', data)
            });


            for (var i = 0 ; i < 5 ; i += 1 ) {
                $.ajax('/fixtures/block.php').then(function (data) {
                    k.push(i);
                    data.i = this;
                    log(JSON.stringify(data));
                })
            }

            console.log(k.join(','));

        });
    </script>
</body>
</html>