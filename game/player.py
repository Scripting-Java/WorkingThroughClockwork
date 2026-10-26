import pygame
class Player:
    def __init__(self):
        self.rect = pygame.Rect(100,450,40,60)
        self.speed = 5

    def draw(self, screen):
        pygame.draw.rect(screen,(180,130,60), self.rect)