from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models as mod


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """ Create and save a new organization with User
            (password optional)
        """
        # Check arguments
        if not email:
            raise ValueError('The given email must be set')

        # Create user
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            **extra_fields
        )

        # Decide on password
        if password is None:
            user.set_unusable_password()
        else:
            user.set_password(password)

        # Create organization if none provided
        if extra_fields.get('organization') is None:
            org = Organization(name="SIGNUPDUMMY")
            org.save(using=self._db)
            user.organization = org
            user.organization_owner = True

        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    """ Custom User model that utilises email instead of an username """
    username = None
    email = mod.EmailField(unique=True)
    organization = mod.ForeignKey(
        'users.Organization', on_delete=mod.CASCADE,
    )
    organization_owner = mod.BooleanField(default=False)
    clients = mod.ManyToManyField('clients.Client', blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f'User: {self.email}'


class Organization(mod.Model):
    """ TODO: Docstring """
    name = mod.CharField(max_length=200)

    def __str__(self):
        return f'Organization: {self.name}'
