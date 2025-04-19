class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Wake up");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);

        if (locationData.Choices && locationData.Choices.length > 0) {
            for (let choice of locationData.Choices) {
                // Exclude choices that give objects the player already has
                if ((!choice.RequiresObject || hasObject(choice.RequiresObject)) &&
                    (!choice.GivesObject || !hasObject(choice.GivesObject)) &&
                    (!choice.ActionCompleted || !hasObject(choice.ActionCompleted))){
                    this.engine.addChoice(choice.Text, choice);
                }
            }
        } else {
            this.engine.addChoice("Credits");
        }
    }

    handleChoice(choice) {
        if (choice) {
            this.engine.show("&gt; " + choice.Text);

            // Add object to inventory if the choice gives one
            if (choice.GivesObject) {
                addObjectToInventory(choice.GivesObject);
            }

            // Mark the action as completed if it doesn't give an object
            if (choice.ActionCompleted) {
                addObjectToInventory(choice.ActionCompleted);
            }

            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

let playerInventory = new Set();

function addObjectToInventory(object) {
    playerInventory.add(object);
}

function removeObjectFromInventory(object) {
    playerInventory.delete(object);
}

function hasObject(object) {
    return playerInventory.has(object);
}

Engine.load(Start, 'myStory.json');