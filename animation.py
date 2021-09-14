"""
Goal - to animate Cecil the Sagehen to run
"""
import sys
import pygame

# globally def colors
WHITE = (255, 255, 255)

# passing in Sprite object
class Player(pygame.sprite.Sprite):
    """
    the code associated with Sagehen's actions
    """
    # init -> constructor
    def __init__(self, pos_x, pos_y):
        """
        controls the walking of the sprite
        """
        super().__init__()
        self.attack_animation = False
        self.sprites = []
        self.sprites.append(pygame.image.load('cropped_sagehen.run-1.png'))
        self.sprites.append(pygame.image.load('cropped_sagehen.run-2.png'))
        self.sprites.append(pygame.image.load('cropped_sagehen.run-3.png'))
        self.sprites.append(pygame.image.load('cropped_sagehen.run-4.png'))
        self.sprites.append(pygame.image.load('cropped_sagehen.run-5.png'))
        self.sprites.append(pygame.image.load('cropped_sagehen.run-6.png'))
        self.sprites.append(pygame.image.load('cropped_sagehen.run-7.png'))
        self.sprites.append(pygame.image.load('cropped_sagehen.run-8.png'))
        self.current_sprite = 0
        self.image = self.sprites[self.current_sprite]

        self.rect = self.image.get_rect()
        # positions animation window
        self.rect.topleft = [pos_x,pos_y]


    def attack(self):
        """
        activates running
        """
        self.attack_animation = True

    def update(self, speed):
        """
        tells us if animation is running
        """
        if self.attack_animation:
            self.current_sprite += speed
            if int(self.current_sprite) >= len(self.sprites):
                self.current_sprite = 0
                self.attack_animation = False

        # will round self.current_sprite to slow frames
        self.image = self.sprites[int(self.current_sprite)]

# General setup()
pygame.init()
clock = pygame.time.Clock()


# Game Screen
size = (1920, 1080)
# no arg for set_mode -> auto fit
screen = pygame.display.set_mode()
pygame.display.set_caption("Sagehen Sprint")


# Creating the sprites and groups
moving_sprites = pygame.sprite.Group()
player = Player(310, 477)
moving_sprites.add(player)

# drawing
# screen.fill(WHITE)
# moving_sprites.draw(screen)
# background
background = pygame.image.load('Untitled_Artwork.png')
# background image
screen.blit(background, (0, 0))
screen.blit(player.sprites[0], (400, 0))
moving_sprites.update(0.25) # change below 1 to make animation slower
pygame.display.flip()

# Game Loop
RUNNING = True

# runs though the frames
tracker = 0
while RUNNING:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            player.attack()

    # loops animation though frames
    if tracker >= 7:
        tracker = 0 
    else:
        tracker += 1

    screen.blit(background, (0, 0))
    screen.blit(player.sprites[tracker], (400, 0))
    # freeze each frame for 60ms 
    clock.tick(60)
      
# pygame.quit()
