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
    <button>execute</button>

    <pre></pre>

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

            document.querySelector('button').addEventListener('click', function () {

                // input data;
                var input = ('0123456789abcdefghijklmnoprstuwxyz'.repeat(10)).split('');

                // how many simultanious request
                var limit = 3;

                // final callback
                function callback(data) {
                    log('finally: ', data)
                }

                // method to process one piece of data
                function execute(v) {
                    return $.ajax('http://hub.vagrant8/block.php?' + v).then(function () {
                        return v;
                    });
                }

                (function (input, limit) {
                    var output = [], count = 0;
                    return new Promise(function (resolve) {
                        function next() {
                            if (!input.length) {
                                return resolve(output);
                            }
                            if (count < limit) {
                                count += 1;
                                var v = input.shift();
                                execute(v).then(function (data) {
                                    count -= 1;
                                    output = output.concat([data]);
                                    next();
                                });
                                next();
                            }
                        }
                        next();
                    });
                }(input, limit, execute)).then(callback);
            });

        });
    </script>
</body>
</html>