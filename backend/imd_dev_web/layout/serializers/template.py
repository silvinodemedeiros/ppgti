from rest_framework import serializers
from layout.models import Template

# Serializer base para Template
class TemplateSerializer(serializers.ModelSerializer):
    """
    Serializer principal para manipulação geral dos campos do modelo Template.
    """

    class Meta:
        model = Template
        fields = (
            'id', 
            'name',
            'grids'
        )

# Serializer para criação de Template utilizando o ID
class TemplateCreate(serializers.ModelSerializer):
    """
    Serializer para criação de Template utilizando o ID.
    """
    
    class Meta:
        model = Template
        fields = ('id', 'name', 'grids')

    def create(self, validated_data):
        """
        Método de criação customizado, se necessário.
        """
        grids_data = validated_data.pop('grids', [])
        tem = Template.objects.create(**validated_data)
        tem.grids.set(grids_data)
        return tem

# Serializer para atualização de Template usando o ID
class TemplateUpdate(serializers.ModelSerializer):
    """
    Serializer para atualização de Template utilizando o ID.
    """
    
    class Meta:
        model = Template
        fields = ('id', 'name', 'grids')

    def update(self, instance, validated_data):
        """
        Atualiza os dados de um registro existente, incluindo a associação de células.
        """
        # Atualiza os campos que não são ManyToMany
        for attr, value in validated_data.items():
            if attr != 'grids':  # Ignora o campo 'grids' na atualização direta
                setattr(instance, attr, value)

        # Atualiza o campo ManyToMany (grids)
        grids_data = validated_data.get('grids', [])
        if grids_data:
            instance.grids.set(grids_data)  # Atualiza as células associadas

        instance.save()
        return instance