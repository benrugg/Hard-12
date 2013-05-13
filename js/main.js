// Generated by CoffeeScript 1.6.2
(function() {
  $(document).ready(function() {
    var betAmount, finalTotal, finalWinOrLoss, i, oddsPayout, rollDie, rollPairOfDice, runCraps, _i;

    betAmount = 5;
    oddsPayout = 30;
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
    runCraps = function(numTimes) {
      var $newDiv, $newSpan, i, losses, newRoll, numWins, rolls, total, winnings, wonOrLost;

      numWins = 0;
      $newDiv = $("<div>").appendTo("body");
      rolls = (function() {
        var _i, _results;

        _results = [];
        for (i = _i = 1; _i <= numTimes; i = _i += 1) {
          newRoll = rollPairOfDice();
          $newSpan = $("<span>").text(newRoll.join()).appendTo($newDiv);
          if (newRoll[0] + newRoll[1] === 12) {
            $newSpan.addClass("hard_12");
            _results.push(numWins++);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      })();
      losses = (numTimes - numWins) * betAmount;
      winnings = numWins * betAmount * oddsPayout;
      total = winnings - losses;
      wonOrLost = formatWinOrLoss(total, "Won " + formatCurrency(total), "Lost " + formatCurrency(-total), "Broke even");
      $("<label>").text(wonOrLost.text).addClass(wonOrLost.result).appendTo($newDiv);
      return total;
    };
    finalTotal = 0;
    for (i = _i = 1; _i <= 10; i = ++_i) {
      finalTotal += runCraps(20);
    }
    finalWinOrLoss = formatWinOrLoss(finalTotal, "You're up! You've won a total of " + formatCurrency(finalTotal), "There's always next time. You've lost a total of " + formatCurrency(-finalTotal), "Hey, you're even. Maybe you should keep betting.");
    return $("<footer>").text(finalWinOrLoss.text).addClass(finalWinOrLoss.result).appendTo("body");
  });

}).call(this);