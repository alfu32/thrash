/**
 * Created with JetBrains PhpStorm.
 * User: ioanalferaru
 * Date: 10/26/12
 * Time: 11:27 AM
 * To change this template use File | Settings | File Templates.
 */
function BitsToBytes(i) {
    o = 42;
    if (i.charAt(0) == '1') {
        o += 32;
    }
    if (i.charAt(1) == '1') {
        o += 16;
    }
    if (i.charAt(2) == '1') {
        o += 8;
    }
    if (i.charAt(3) == '1') {
        o += 4;
    }
    if (i.charAt(4) == '1') {
        o += 2;
    }
    if (i.charAt(5) == '1') {
        o += 1;
    }
    if (o >= 92) {
        o ++;
    }
    return String.fromCharCode(o);
}
function StringMaker() {
    this.str = "";
    this.length = 0;
    this.append = function (s) {
        this.str += s;
        this.length += s.length;
    }
    this.prepend = function (s) {
        this.str = s + this.str;
        this.length += s.length;
    }
    this.toString = function () {
        return this.str;
    }
}
function Huffman_Compress(ov) {
    // Do initial scan
    var Letters = new Array(256);
    var LetterCodes = new Array(256);
    //var C = document.daForm.Comp;
    //var P = document.daForm.Progress;
    //var ov = document.daForm.Orig.value;

    log("Working ...");
    log("Counting Letters");

    for (var i = 0; i < 256; i ++) {
        Letters[i] = 0;
    }

    for (var i = 0; i < ov.length; i ++) {
        if ((i & 0xFF) == 0) {
            //log("Counting Letters - " + Math.floor((100 * i) / ov.length) + "%");
        }
        Letters[ov.charCodeAt(i)] ++;
    }

    //   This is a testing tree
    //   It should produce a list like this:
    //               __[  ]__
    //         [  ]~~        ~~[  ]__
    //       50    51        52      ~~[  ]
    //                               53    54
    //
    //   Letters[50] = 7;
    //   Letters[51] = 6;
    //   Letters[52] = 5;
    //   Letters[53] = 2;
    //   Letters[54] = 1;

    // Build a Huffman tree from the letter count frequencies
    var NodeLetter = new Array(512);
    var NodeCount = new Array(512);
    var NodeChild1 = new Array(512);
    var NodeChild2 = new Array(512);
    var NextParent = 0;

    log("Constructing node list");
    for (var i = 0; i < 256; i ++) {
        if (Letters[i] > 0) {
            NodeLetter[NextParent] = i;
            NodeCount[NextParent] = Letters[i];
            NodeChild1[NextParent] = -1;
            NodeChild2[NextParent] = -1;
            NextParent ++;
        }
    }

    // Built node list.  Now combine nodes to make a tree
    log("Constructing tree");
    var SmallestNode2 = 1;
    var SmallestNode1 = 1;
    while (SmallestNode2 != -1) {
        SmallestNode1 = -1;
        SmallestNode2 = -1;

        for (var i = 0; i < NextParent; i ++) {
            if (NodeCount[i] > 0) {
                if (SmallestNode1 == -1) {
                    SmallestNode1 = i;
                } else if (SmallestNode2 == -1) {
                    if (NodeCount[i] < NodeCount[SmallestNode1]) {
                        SmallestNode2 = SmallestNode1;
                        SmallestNode1 = i;
                    } else {
                        SmallestNode2 = i;
                    }
                } else if (NodeCount[i] <= NodeCount[SmallestNode1]) {
                    SmallestNode2 = SmallestNode1;
                    SmallestNode1 = i;
                }
            }
        }

        if (SmallestNode2 != -1) {
            NodeCount[NextParent] = NodeCount[SmallestNode1] + NodeCount[SmallestNode2];
            NodeCount[SmallestNode1] = 0;
            NodeCount[SmallestNode2] = 0;
            // Reversed SmallestNode numbers here for ordering in the tree
            NodeChild1[NextParent] = SmallestNode2;
            NodeChild2[NextParent] = SmallestNode1;
            NextParent ++;
        }
    }

    // We have constructed the nodes.  Now rewrite the list into a single
    // array.
    // The value of an array element will be positive if it is the
    // character code we want.  Otherwise, it branches.  The left branch
    // will be the next array element.  The value of the array will be
    // (offset * -1), which is the right branch.
    log("Making final array");
    var FinalNodes = Array(NextParent);
    var DepthIndex = Array(256);
    var Depth = 0;
    var NextFinal = 0;
    DepthIndex[Depth] = SmallestNode1;
    while (Depth >= 0) {
        if (NodeChild1[DepthIndex[Depth]] > -1 && NodeChild2[DepthIndex[Depth]] > -1) {
            // If there is a left and right, push them on the stack
            idx = NodeChild1[DepthIndex[Depth]];
            NodeChild1[DepthIndex[Depth]] = -2 - NextFinal;
            Depth ++;
            DepthIndex[Depth] = idx;
            NextFinal ++;
        } else if (NodeChild1[DepthIndex[Depth]] < 0 && NodeChild2[DepthIndex[Depth]] > -1) {
            // If there is a left and a right, but the left was taken,
            // push the right on the stack.
            // Update the FinalNodes[] with the location for the right
            // branch.
            var idx = NodeChild1[DepthIndex[Depth]];
            idx = 0 - idx;
            idx -= 2;
            FinalNodes[idx] = - NextFinal;

            // Traverse right branch
            idx = NodeChild2[DepthIndex[Depth]];
            NodeChild2[DepthIndex[Depth]] = -2;
            Depth ++;
            DepthIndex[Depth] = idx;
        } else if (NodeChild1[DepthIndex[Depth]] < -1 && NodeChild2[DepthIndex[Depth]] < -1) {
            // If there was a left and a right, but they were both taken, pop up a level
            Depth --;
        } else if (NodeChild1[DepthIndex[Depth]] == -1 && NodeChild2[DepthIndex[Depth]] == -1) {
            // If we have a child here, add it to the final nodes, pop up
            FinalNodes[NextFinal] = NodeLetter[DepthIndex[Depth]];
            NextFinal ++;
            Depth --;
        } else {
            // This shouldn't ever happen
            alert('Bad algorithm!');
            return;
        }
    }


    // We have the tree.  Associate codes with the letters.
    log("Determining codes");
    var CodeIndex = new Array(256);
    DepthIndex[0] = 0;
    CodeIndex[0] = "";
    Depth = 0;
    while (Depth >= 0) {
        if (FinalNodes[DepthIndex[Depth]] < 0) {
            c = CodeIndex[Depth];
            idx = DepthIndex[Depth];
            DepthIndex[Depth + 1] = DepthIndex[Depth] + 1;
            CodeIndex[Depth + 1] = c + '0';
            DepthIndex[Depth] = 0 - FinalNodes[idx];
            CodeIndex[Depth] = c + '1';
            Depth ++;
        } else {
            LetterCodes[FinalNodes[DepthIndex[Depth]]] = CodeIndex[Depth];
            Depth --;
        }
    }


    // Build resulting data stream
    // The bits string could get very large
    log("Building data stream");
    var bits = "";
    var bytes = new StringMaker();
    for (var i = 0; i < ov.length; i ++) {
        if ((i & 0xFF) == 0) {
            //log("Building Data Stream - " + Math.floor((100 * i) / ov.length) + "%");
        }
        bits += LetterCodes[ov.charCodeAt(i)];
        while (bits.length > 5) {
            bytes.append(BitsToBytes(bits));
            bits = bits.slice(6, bits.length);
        }
    }
    bytes.append(BitsToBytes(bits));

    log("Writing final script");

    var S = "<scr" + "ipt language=\"JavaScript1.2\">\n<!--\n";
    var encodedNodes = "";
    for (i = 0; i < FinalNodes.length; i ++) {
        var x, y;
        x = FinalNodes[i] + 512;
        y = x & 0x3F;
        x >>= 6;
        x &= 0x3F;
        x += 42;
        y += 42;
        if (x >= 92) {
            x ++;
        }
        if (y >= 92) {
            y ++;
        }
        encodedNodes += String.fromCharCode(x) + String.fromCharCode(y);
    }
    S += 'a=';
    while (encodedNodes.length > 74) {
        S += '"' + encodedNodes.slice(0, 74) + "\"\n+";
        encodedNodes = encodedNodes.slice(74, encodedNodes.length);
    }
    S += '"' + encodedNodes + "\";\n";
    S += "l=new Array();\n";
    S += "while(a.length){l.push((Y(a.charCodeAt(0))<<6)+Y(a.charCodeAt(1))-512);\n";
    S += "a=a.slice(2,a.length)}\n";
    S += 'd=';
    bytes = bytes.toString();
    while (bytes.length > 74) {
        S += '"' + bytes.slice(0, 74) + "\"\n+";
        bytes = bytes.slice(74, bytes.length);
    }
    S += '"' + bytes + "\";\n";
    S += 'c=' + ov.length + ";e=b=a=0;o=\"\";\n";
    S += "function Y(y){if(y>92)y--;return y-42}\n";
    S += "function B(){if(a==0){b=Y(d.charCodeAt(e++));a=6;}\n";
    S += "return ((b>>--a)&0x01);}\n";
    S += "while(c--){i=0;while(l[i]<0){if(B())i=-l[i];else i++;}\n";
    S += "o+=String.fromCharCode(l[i]);}" +
        "document.write(o);\n";
    S += "// --></scr" + "ipt>";

    log("Done.  Compressed by " + Math.floor(100 * (ov.length - S.length) / ov.length) + "% (" + ov.length + " -> " + S.length + ")");

    return S;
}