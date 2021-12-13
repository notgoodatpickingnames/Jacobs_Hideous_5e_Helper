export enum GameObjectTypes {
    image = 'image', // Things that are just meant as set dressing
    npc = 'npc', // Entities tied to NPC's
    player = 'player', // Entities tied to a player
    inventoryItem = 'inventoryItem', // Entities tied to an inventory item that can be picked up
    sceneConnector = 'sceneConnector', // Entities tied to a scene connector that have the enter option
}