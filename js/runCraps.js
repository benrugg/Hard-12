// Generated by CoffeeScript 1.6.2
(function() {
  var rollDie, rollPairOfDice;

  rollDie = function() {
    return Math.floor(Math.random() * 6) + 1;
  };

  rollPairOfDice = function() {
    var i, _i, _results;

    _results = [];
    for (i = _i = 0; _i <= 1; i = ++_i) {
      _results.push(rollDie());
    }
    return _results;
  };

  self.addEventListener("message", function(e) {
    var numRolls, onceOrIndefinitely, runCraps;

    numRolls = e.data.numRolls;
    onceOrIndefinitely = e.data.onceOrIndefinitely;
    runCraps = function(numRolls, returnAllRolls) {
      var i, newRoll, numWins, rollResults, thisRollWon, _i;

      numWins = 0;
      rollResults = "";
      for (i = _i = 1; _i <= numRolls; i = _i += 1) {
        thisRollWon = false;
        newRoll = rollPairOfDice();
        if (newRoll[0] + newRoll[1] === 12) {
          thisRollWon = true;
          numWins++;
        }
        if (returnAllRolls) {
          rollResults += "<span" + (thisRollWon ? " class='hard_12'" : "") + ("> " + (newRoll.join()) + " </span>");
        }
      }
      return self.postMessage({
        numRolls: numRolls,
        numWins: numWins,
        rollResults: rollResults
      });
    };
    if (onceOrIndefinitely === "once") {
      return runCraps(numRolls, true);
    } else {
      return setInterval(function() {
        return runCraps(numRolls, false);
      }, 10);
    }
  }, false);

}).call(this);