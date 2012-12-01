
function array_count_values(array) {

    var tmp_arr = {},
    key = '',
    t = '';

    var __getType = function (obj) {
        // Objects are php associative arrays.
        var t = typeof obj;
        t = t.toLowerCase();
        if (t === "object") {
            t = "array";
        }
        return t;
    };

    var __countValue = function (value) {
        switch (typeof (value)) {
            case "number":
                if (Math.floor(value) !== value) {
                    return;
                }
                // Fall-through
            case "string":
                if (value in this && this.hasOwnProperty(value)) {
                    ++this[value];
                } else {
                    this[value] = 1;
                }
        }
    };

    t = __getType(array);
    if (t === 'array') {
        for (key in array) {
            if (array.hasOwnProperty(key)) {
                __countValue.call(tmp_arr, array[key]);
            }
        }
    }
    return tmp_arr;
}
