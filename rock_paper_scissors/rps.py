#!/usr/bin/env python3
import random
"""This program plays a game of Rock, Paper, Scissors between two Players,
and reports both Player's scores each round."""

moves = ['rock', 'paper', 'scissors']


class Player:

    def move(self):
        return 'rock'

    def learn(self, my_move, their_move):
        self.their_move = their_move


def beats(one, two):
    return ((one == 'rock' and two == 'scissors') or
            (one == 'scissors' and two == 'paper') or
            (one == 'paper' and two == 'rock'))


class RandomPlayer(Player):
    def move(self):
        player_move = random.choice(moves)
        return player_move


class HumanPlayer(Player):
    def move(self):
        human_move = input("Rock, Paper, Scissors? > ").lower()
        while human_move not in moves:
            human_move = input("Rock, Paper, Scissors? > ").lower()
        return human_move


class ReflectPlayer(Player):
    def __init__(self):
        self.their_move = None

    def move(self):
        if self.their_move is None:
            return random.choice(moves)
        else:
            return self.their_move


class CyclePlayer(Player):
    def __init__(self):
        self.my_move = 0
        move = moves[0]

    def move(self):
        if self.my_move == 0:
            move = moves[0]
            self.my_move += 1
        elif self.my_move == 1:
            move = moves[1]
            self.my_move += 1
        elif self.my_move == 2:
            move = moves[2]
            self.my_move = 0
        return move


class Game:
    def __init__(self, p1, p2):
        self.p1 = p1
        self.p2 = p2
        self.count_player1 = 0
        self.count_player2 = 0

    def play_round(self):
        move1 = self.p1.move()
        move2 = self.p2.move()
        print(f"You played {move1}.")
        print(f"Opponent played {move2}.")
        if move1 == 'rock' and move2 == 'scissors':
            print("* * PLAYER 1 WINS * *")
        elif move1 == 'rock' and move2 == 'paper':
            print("* * PLAYER 2 WINS * *")
        elif move1 == 'paper' and move2 == 'rock':
            print("* * PLAYER 1 WINS * *")
        elif move1 == 'paper' and move2 == 'scissors':
            print("* * PLAYER 2 WINS * *")
        elif move1 == 'scissors' and move2 == 'rock':
            print("* * PLAYER 2 WINS * *")
        elif move1 == 'scissors' and move2 == 'paper':
            print("* * PLAYER 1 WINS * *")
        else:
            print("** TIE **")
        self.p1.learn(move1, move2)
        self.p2.learn(move2, move1)
        if beats(move1, move2):
            self.count_player1 += 1
            p1score = self.count_player1
            p2score = self.count_player2
            print(f"Score: Player One {p1score}, Player Two {p2score}\n\n")
        elif beats(move2, move1):
            self.count_player2 += 1
            p1score = self.count_player1
            p2score = self.count_player2
            print(f"Score: Player One {p1score}, Player Two {p2score}\n\n")
        else:
            p1score = self.count_player1
            p2score = self.count_player2
            print(f"Score: Player One {p1score}, Player Two {p2score}\n\n")

    def play_game(self):
        print("Rock Paper Scissors, Go!\n\n")
        for round in range(4):
            print(f"Round {round} --")
            self.play_round()
            p1score = self.count_player1
            p2score = self.count_player2
        print(f"The final score is Player One {p1score},"
              f" Player Two {p2score}\n\n")
        if p1score > p2score:
            print("* * PLAYER 1 WINS * *")
        elif p1score < p2score:
            print("* * PLAYER 2 WINS * *")
        else:
            print("It's a tie. No one wins")
        print("Game over!\n")
        print("***** RESTARTING GAME *****")

    def play_one_game(self):
        print("Rock Paper Scissors, Go!\n\n")
        print(f"Round 1 of 1")
        self.play_round()
        p1score = self.count_player1
        p2score = self.count_player2
        print(f"The final score is Player One {p1score},"
              f" Player Two {p2score}\n\n")
        if p1score > p2score:
            print("* * PLAYER 1 WINS * *")
        elif p1score < p2score:
            print("* * PLAYER 2 WINS * *")
        else:
            print("It's a tie. No one wins")
        print("Game over!\n")
        print("***** RESTARTING GAME *****")


if __name__ == '__main__':

    game = Game(HumanPlayer(), CyclePlayer())
    while True:
        try:
            answer = input("\nWould like to play only a single round? (Y|N): ")
            if answer == 'y' or answer == 'Y':
                game.play_one_game()
            else:
                game.play_game()
        except EOFError:
            end = input("Are you sure you want to end the game? (Y/N): ")
            if end == 'y' or end == 'Y':
                print("Exited game (you pressed CTRL-D)")
                exit()
            elif end == 'n' or end == 'N':
                game.play_game()
