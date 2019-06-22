import time
import random

list = ["wicked fairie", "gorgon", "pirate", "troll", "dragon"]
monster = random.choice(list)
weapons = ["dagger"]


def print_pause(message_to_print):
    print(message_to_print)
    time.sleep(2)


def intro():
    print_pause("You find yourself standing in an open field, "
                "filled with grass and yellow wildflowers.")
    print_pause("Rumor has it that a " + monster + " is "
                "somewhere around here, and has been terrifying"
                " the nearby village.")
    print_pause("In front of you is a house.")
    print_pause("To your right is a dark cave.")
    print_pause("In your hand you hold your trusty "
                "(but not very effective) dagger.")
    print_pause("\n")


def play():
    intro()
    BackToTop()


def house():
    print_pause("You approach the door of the house.")
    print_pause("You are about to knock when the door "
                "opens and out steps a " + monster + ".")
    print_pause("Eep! This is the " + monster + "'s"
                " house!")
    print_pause("The " + monster + " attacks you!")
    if "sword" in weapons:
        response = input("Would you like to (1) fight"
                         " or (2) run away?")
        if response == '1':
            fight()
        elif response == '2':
            runAway()
        else:
            playagain()
    else:
        print_pause("You feel a bit under-prepared for this,"
                    " with only having a tiny dagger.")
        response = input("Would you like to (1) fight or"
                         " (2) run away?")
        if response == '1':
            fight()
        elif response == '2':
            runAway()
        else:
            playagain()


def fight():
    if "sword" in weapons:
        print_pause("The Sword of Ogoroth shines brightly"
                    " in your hand as you brace yourself for the attack.")
        print_pause("But the " + monster + " takes one look at "
                    "your shiny new toy and runs away!")
        print_pause("You have rid the town of the " + monster + "."
                    " You are victorious!")
        playagain()
    else:
        print_pause("You do your best...")
        print_pause("but your dagger is no match for the"
                    " " + monster + ".")
        print_pause("You have been defeated!")
        playagain()


def field():
    print_pause("Enter 1 to knock on the door of the house.")
    print_pause("Enter 2 to peer into the cave.")
    print_pause("What would you like to do?")


def runAway():
    print_pause("You run back into the field. Luckily, you don't"
                " seem to have been followed.\n")
    BackToTop()


def cave():
    print_pause("You peer cautiously into the cave.")
    print_pause("It turns out to be only a very small cave.")
    if "sword" not in weapons:
        print_pause("Your eye catches a glint of metal"
                    " behind a rock.")
        print_pause("You have found the magical Sword of Ogoroth!")
        weapons.append("sword")
        print_pause("You discard your silly old dagger and take the"
                    " sword with you.")
        print_pause("You walk back out to the field.\n")
        BackToTop()
    else:
        print_pause("You've been here before, and gotten all the good stuff."
                    " It's just an empty cave now.")
        print_pause("You walk back out to the field.\n")
        BackToTop()


def HouseOrCave():
    response = input("(Please enter 1 or 2.)\n")
    if response == '1':
        house()
    elif response == '2':
        cave()
    else:
        HouseOrCave()


def BackToTop():
    field()
    HouseOrCave()


def playagain():
    answer = input("Would you like to play again? (y/n)")
    if answer == 'y':
        print_pause("Excellent! Restarting the game ...")
        weapons = ["dagger"]
        play()
    elif answer == 'n':
        print_pause("Thank you for playing! See you next time")
    else:
        playagain()


play()
