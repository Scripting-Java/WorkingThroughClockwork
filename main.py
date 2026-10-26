import pygame
pygame.init()
width = 1000
height = 600
fps=60
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Working Through Clockwork")
clock = pygame.time.Clock()
running = True

while running:
    for event in pygame.event.get():
        if(event.type == pygame.QUIT):
            running = False
    screen.fill((40,40,40))
    pygame.display.flip()
    clock.tick(fps)
pygame.quit()